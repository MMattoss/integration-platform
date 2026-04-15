import { HttpService } from "@nestjs/axios";
import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { firstValueFrom } from "rxjs";
import { ConnectionsService } from "src/connections/connections.service";
import { AuthType } from "src/connections/enums/connections.enum";
import { CredentialsType } from "src/connections/interfaces/connections.interface";
import { ThirdPartySystemsService } from "src/connections/thirdPartySystem.service";
import { EncryptionService } from "src/encryption/encryption.service";
import { ExecutionStatus, LogLevel } from "src/executions/enums/executions.enum";
import { EventLogService } from "src/executions/eventLog.service";
import { ExecutionStepService } from "src/executions/executions.service";
import { WorkflowStep } from "src/workflows/entities/workflowStep.entity";
import { WorkflowRunStatus } from "src/workflows/enums/workflow.enum";
import { WorkflowRunService } from "src/workflows/workflowRun.service";
import { WorkflowsService } from "src/workflows/workflows.service";
import { WorkflowStepService } from "src/workflows/workflowStep.service";

type ExecDto = {
  workflowId: string;
}

@Processor('workflow-execution')
export class WorkflowWorker extends WorkerHost {
  constructor(
    private readonly workflowsService: WorkflowsService,
    private readonly workflowRunService: WorkflowRunService,
    private readonly workflowStepService: WorkflowStepService,
    private readonly connectionsService: ConnectionsService,
    private readonly thirdPartySystemsService: ThirdPartySystemsService,
    private readonly encryptionService: EncryptionService,
    private readonly httpService: HttpService,
    private readonly executionStepService: ExecutionStepService,
    private readonly eventLogService: EventLogService,
  ) {
    super();
  }

  async process(job: Job<ExecDto>) {
    const { data } = job;

    const workflow = await this.workflowsService.findOne(data.workflowId);
    const workflowSteps = await this.workflowStepService.findAllByWorkflowId(workflow.id);
    const workflowRun = await this.workflowRunService.create({
      workflowId: workflow.id,
      status: WorkflowRunStatus.RUNNING,
      startedAt: new Date(),
    });

    const context: { steps: Record<string, any> } = { steps: {} };
    let runFailed = false;

    for (const step of workflowSteps) {
      const executionStep = await this.executionStepService.create({
        workflowRunId: workflowRun.id,
        workflowStepId: step.id,
        status: ExecutionStatus.PENDING,
        startedAt: new Date(),
        input: {
          metadata: { attempt: 1, sourceStepId: this.resolveSourceStepId(step, workflowSteps) },
          data: this.resolveInputData(step, context),
        },
        output: { metadata: { attempt: 1 }, data: {} },
      });

      await this.executionStepService.update(executionStep.id, {
        status: ExecutionStatus.IN_PROGRESS,
      });

      try {
        const output = await this.executeStep(step, context);

        context.steps[step.id] = output;

        await this.executionStepService.update(executionStep.id, {
          status: ExecutionStatus.SUCCESS,
          finishedAt: new Date(),
          output: { metadata: { attempt: 1 }, data: output },
        });

        await this.eventLogService.create({
          executionStepId: executionStep.id,
          level: LogLevel.INFO,
          message: `Step ${step.id} completed successfully`,
          payload: { context: { stepType: step.type } },
        });
      } catch (err) {
        runFailed = true;

        await this.executionStepService.update(executionStep.id, {
          status: ExecutionStatus.FAILED,
          finishedAt: new Date(),
        });

        await this.eventLogService.create({
          executionStepId: executionStep.id,
          level: LogLevel.ERROR,
          message: `Step ${step.id} failed: ${err.message}`,
          payload: {
            errorCode: err.code ?? 'UNKNOWN',
            stackTrace: err.stack,
            context: { stepType: step.type },
          },
        });

        // Stop the run on first failure — add retry logic here later if needed
        break;
      }
    }

    await this.workflowRunService.update(workflowRun.id, {
      finishedAt: new Date(),
      status: runFailed ? WorkflowRunStatus.FAILED : WorkflowRunStatus.SUCCESS,
    });
  }

  // ─── Private helpers ────────────────────────────────────────────────────────

  private async executeStep(
    step: WorkflowStep,
    context: { steps: Record<string, any> },
  ): Promise<Record<string, any>> {
    if (!step.connectionId) {
      // TRANSFORMATION or CONDITION steps with no external connection
      return this.executeLocalStep(step, context);
    }

    const connection = await this.connectionsService.findOne(step.connectionId);
    const thirdPartySystem = await this.thirdPartySystemsService.findOne(
      connection.thirdPartySystemId,
    );
    const decryptedCredentials = await this.encryptionService.decrypt(
      connection.credentialsEncrypted,
    );
    const credentials = JSON.parse(decryptedCredentials) as CredentialsType;

    const headers = this.buildAuthHeaders(credentials);
    const body = this.resolveInputData(step, context);

    const res = await firstValueFrom(
      this.httpService.request({
        method: step.configJson.method,
        url: `${thirdPartySystem.baseUrl}${step.configJson.path}`,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        data: ['POST', 'PUT', 'PATCH'].includes(step.configJson.method) ? body : undefined,
        params: step.configJson.method === 'GET' ? body : undefined,
      }),
    );

    return res.data as Record<string, any>;
  }

  private buildAuthHeaders(credentials: CredentialsType): Record<string, string> {
    switch (credentials.type) {
      case AuthType.OAUTH2:
        return { Authorization: `Bearer ${credentials.accessToken}` };

      case AuthType.API_KEY:
        return { 'X-Api-Key': credentials.apiKey };

      case AuthType.BASIC: {
        const encoded = Buffer.from(
          `${credentials.username}:${credentials.password}`,
        ).toString('base64');
        return { Authorization: `Basic ${encoded}` };
      }

      case AuthType.NONE:
        return {};
    }
  }

  private executeLocalStep(
    step: WorkflowStep,
    context: { steps: Record<string, any> },
  ): Record<string, any> {
    // Stub — real TRANSFORMATION/CONDITION logic goes here
    // e.g. evaluate a JSONata expression, run a JS snippet, branch on a condition
    return { ...this.resolveInputData(step, context) };
  }

  /**
   * Applies the step's field mapping to pull values from previous step outputs.
   * mapping example: { "userId": "steps.abc123.id", "email": "steps.abc123.email" }
   */
  private resolveInputData(
    step: WorkflowStep,
    context: { steps: Record<string, any> },
  ): Record<string, any> {
    const resolved: Record<string, any> = {};

    for (const [targetKey, sourcePath] of Object.entries(step.configJson.mapping ?? {})) {
      resolved[targetKey] = this.resolvePath(sourcePath, context);
    }

    return resolved;
  }

  private resolvePath(path: string, context: { steps: Record<string, any> }): any {
    // Supports paths like "steps.<stepId>.someField"
    const parts = path.split('.');
    let cursor: any = context;
    for (const part of parts) {
      if (cursor == null) return undefined;
      cursor = cursor[part];
    }
    return cursor;
  }

  private resolveSourceStepId(
    step: WorkflowStep,
    allSteps: WorkflowStep[],
  ): string | undefined {
    const previous = allSteps.find((s) => s.order === step.order - 1);
    return previous?.id;
  }
}
import { HttpService } from "@nestjs/axios";
import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { firstValueFrom } from "rxjs";
import { ConnectionsService } from "src/connections/connections.service";
import { AuthType } from "src/connections/enums/connections.enum";
import { CredentialsType } from "src/connections/interfaces/connections.interface";
import { ThirdPartySystemsService } from "src/connections/thirdPartySystem.service";
import { EncryptionService } from "src/encryption/encryption.service";
import { WorkflowStatus } from "src/workflows/enums/workflow.enum";
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
  ) {
    super();
  }

  async process(job: Job<ExecDto>) {
    const {
      data
    } = job;
    const workflow = await this.workflowsService.findOne(data.workflowId);
    const workflowSteps = await this.workflowStepService.findAllByWorkflowId(workflow.id);
    // const workflowRun = await this.workflowRunService.create({
    //   workflowId: workflow.id,
    //   status: WorkflowStatus.ACTIVE,
    // });
    const context: { steps: Record<string,any>} = { steps: {} };

    for(const step of workflowSteps) {
      if (!step.connectionId) continue;
      const connection = await this.connectionsService.findOne(step.connectionId);
      const thirdPartySystem = await this.thirdPartySystemsService.findOne(connection.thirdPartySystemId);
      const decryptedCredentials = await this.encryptionService.decrypt(connection.credentialsEncrypted);
      const credentials = JSON.parse(decryptedCredentials) as CredentialsType;
      
      // 5. Execute
      switch (credentials.type) {
        case AuthType.OAUTH2: {
          const url = thirdPartySystem.baseUrl;
          const method = step.configJson.method;
          const bearerToken = credentials.accessToken;

          try {
            const res = await firstValueFrom(
              this.httpService.request({
                method,
                url: `${url}${step.configJson.path}`,
                headers: {
                  Authorization: `Bearer ${bearerToken}`,
                  'Content-Type': 'application/json',
                },
              }),
            );

            context.steps[step.id] = res.data as Record<string,any>;
            console.log(context.steps[step.id]);
          } catch (err) {
            console.error(err);
          } finally {
            // log result
          }
        }
        case AuthType.API_KEY: {

        }
        case AuthType.BASIC: {

        }
        case AuthType.NONE: {

        }
      }
      
    }
    
    // await this.workflowRunService.update(workflowRun.id, { finishedAt: new Date() });
  }
}
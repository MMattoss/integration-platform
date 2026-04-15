import { ExecutionStatus } from '../enums/executions.enum'; 
import { StepDataEnvelope } from '../interfaces/execution.inteface'; 

export class CreateExecutionStepDto {
  workflowRunId: string;
  workflowStepId: string;
  status: ExecutionStatus;
  startedAt: Date;
  finishedAt?: Date;
  input: StepDataEnvelope;
  output: StepDataEnvelope;
}
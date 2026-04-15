import { StepType } from "../enums/workflow.enum";
import { RetryPolicy, StepConfig } from "../interfaces/workflow.inteface";

export class CreateWorkflowStepDto {
  workflowId: string;
  connectionId: string;
  type: StepType;
  configJson: StepConfig;
  retryPolicy: RetryPolicy;
  order: number;
}
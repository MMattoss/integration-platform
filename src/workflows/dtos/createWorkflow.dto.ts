import { TriggerType, WorkflowStatus } from "../enums/workflow.enum";
import { TriggerConfig } from "../interfaces/workflow.inteface";

export class CreateWorkflowDto {
  organizationId: string;
  name: string;
  status: WorkflowStatus;
  triggerType: TriggerType;
  triggerConfig: TriggerConfig;
}
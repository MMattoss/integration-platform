import { WorkflowStatus } from "../enums/workflow.enum";

export class CreateWorkFlowRunDto {
  workflowId: string;
  status: WorkflowStatus;
}
import { WorkflowStatus } from "../enums/workflow.enum";

export interface CreateWorkFlowRunDto {
  workflowId: string;
  status: WorkflowStatus;
}
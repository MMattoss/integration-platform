import { WorkflowStatus } from "../enums/workflow.enum";

export interface UpdateWorkflowRunDto  {
  status?: WorkflowStatus;
  finishedAt?: Date;
}
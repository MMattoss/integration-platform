import { WorkflowStatus } from "../enums/workflow.enum";

export class UpdateWorkflowRunDto  {
  status?: WorkflowStatus;
  finishedAt?: Date;
}
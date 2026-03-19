import { WorkflowRunStatus } from "../enums/workflow.enum";

export class UpdateWorkflowRunDto  {
  status?: WorkflowRunStatus;
  finishedAt?: Date;
}
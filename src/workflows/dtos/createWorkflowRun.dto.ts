import { WorkflowRunStatus } from "../enums/workflow.enum";

export class CreateWorkFlowRunDto {
  workflowId: string;
  status: WorkflowRunStatus;
  startedAt: Date;
}
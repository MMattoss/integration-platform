export enum WorkflowStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
}

export enum WorkflowRunStatus {
  RUNNING = 'RUNNING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export enum TriggerType {
  WEBHOOK = 'WEBHOOK',
  SCHEDULE = 'SCHEDULE',
  MANUAL = 'MANUAL',
}

export enum StepType {
  ACTION = 'ACTION',           
  TRANSFORMATION = 'TRANSFORM',
  CONDITION = 'CONDITION',     
}
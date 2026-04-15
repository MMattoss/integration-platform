export interface StepDataEnvelope {
  metadata: {
    attempt: number;
    sourceStepId?: string;
  };
  data: Record<string, any>;
}

export interface LogPayload {
  errorCode?: string;
  stackTrace?: string;
  context?: Record<string, any>;
}
import { TriggerType } from "../enums/workflow.enum";

export type TriggerConfig =
  | {
      type: TriggerType.WEBHOOK;
      webhookPath: string;
      method?: 'GET' | 'POST';
      secretToken?: string;
    }
  | {
      type: TriggerType.SCHEDULE;
      cronExpression: string;
      timezone: string;
    }
  | {
      type: TriggerType.MANUAL;
      userId?: string;
    };                         

export interface RetryPolicy {
  maxRetries: number;
  backoffMinutes: number;
  strategy: 'LINEAR' | 'EXPONENTIAL';
}

export interface StepConfig {
  operationId: string;
  mapping: Record<string, string>;
}
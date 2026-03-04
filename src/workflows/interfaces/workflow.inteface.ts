export type TriggerConfig = 
  | { webhookPath: string; secretToken?: string }
  | { cronExpression: string; timezone: string } 
  | { userId: string };                          

export interface RetryPolicy {
  maxRetries: number;
  backoffMinutes: number;
  strategy: 'LINEAR' | 'EXPONENTIAL';
}

export interface StepConfig {
  operationId: string;
  mapping: Record<string, string>;
}
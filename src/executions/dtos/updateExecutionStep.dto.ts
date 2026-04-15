import { ExecutionStatus } from '../enums/executions.enum';
import { StepDataEnvelope } from '../interfaces/execution.inteface';

export class UpdateExecutionStepDto {
  status?: ExecutionStatus;
  finishedAt?: Date;
  output?: StepDataEnvelope;
}
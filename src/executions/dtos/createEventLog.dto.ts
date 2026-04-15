import { LogLevel } from "../enums/executions.enum";
import { LogPayload } from "../interfaces/execution.inteface";

export class CreateEventLogDto {
  executionStepId: string;
  level: LogLevel;
  message: string;
  payload: LogPayload;
}
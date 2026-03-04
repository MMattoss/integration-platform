import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExecutionStep } from "./executionStep.entity";
import { LogLevel } from "../enums/executions.enum";
import type { LogPayload } from "../interfaces/execution.inteface";

@Entity()
export class EventLog {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => ExecutionStep, (execStep) => execStep.id)
  executionStepId: string;

  @Column({ type: 'enum', enum: LogLevel })
  level: LogLevel;

  @Column()
  message: string;

  @Column({ type: 'jsonb' })
  payload: LogPayload;

  @CreateDateColumn()
  createdAt: Date;
}
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ExecutionStep } from "./executionStep.entity";
import { LogLevel } from "../enums/executions.enum";
import type { LogPayload } from "../interfaces/execution.inteface";

@Entity()
export class EventLog {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToMany(() => ExecutionStep, (execStep) => execStep.id)
  executionStepId: string;

  @Column()
  level: LogLevel;

  @Column()
  message: string;

  @Column()
  payload: LogPayload;

  @CreateDateColumn()
  createdAt: Date;
}
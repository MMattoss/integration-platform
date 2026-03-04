import { WorkflowRun } from "src/workflows/entities/workflowRun.entity";
import { WorkflowStep } from "src/workflows/entities/workflowStep.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ExecutionStatus } from "../enums/executions.enum";
import type { StepDataEnvelope } from "../interfaces/execution.inteface";

@Entity()
export class ExecutionStep {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToMany(() => WorkflowRun, (workflowRun) => workflowRun.id)
  workflowRunId: string;

  @OneToMany(() => WorkflowStep, (workflowStep) => workflowStep.id)
  workflowStepId: string;

  @Column()
  status: ExecutionStatus;

  @CreateDateColumn()
  startedAt: Date;

  @CreateDateColumn()
  finishedAt: Date;

  @Column()
  input: StepDataEnvelope;

  @Column()
  output: StepDataEnvelope;
}
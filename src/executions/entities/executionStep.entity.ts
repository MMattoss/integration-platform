import { WorkflowRun } from "src/workflows/entities/workflowRun.entity";
import { WorkflowStep } from "src/workflows/entities/workflowStep.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExecutionStatus } from "../enums/executions.enum";
import type { StepDataEnvelope } from "../interfaces/execution.inteface";

@Entity()
export class ExecutionStep {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => WorkflowRun)
  @JoinColumn({ name: 'workflowRunId' })
  workflowRun: WorkflowRun;

  @Column()
  workflowRunId: string;

  @ManyToOne(() => WorkflowStep)
  @JoinColumn({ name:'workflowStepId' })
  workflowStep: WorkflowStep;
  
  @Column()
  workflowStepId: string;

  @Column({ type: 'enum', enum: ExecutionStatus })
  status: ExecutionStatus;

  @Column()
  startedAt: Date;

  @Column({ nullable: true })
  finishedAt: Date;

  @Column({ type: 'jsonb' })
  input: StepDataEnvelope;

  @Column({ type: 'jsonb' })
  output: StepDataEnvelope;
}
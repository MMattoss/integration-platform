import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Workflow } from "./workflow.entity";
import { Connection } from "src/connections/entities/connection.entity";
import { StepType } from "../enums/workflow.enum";
import type { RetryPolicy, StepConfig } from "../interfaces/workflow.inteface";

@Entity()
export class WorkflowStep {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Workflow)
  @JoinColumn({ name: 'workflowId' })
  workflow: Workflow;

  @Column()
  workflowId: string;

  @ManyToOne(() => Connection, { nullable: true })
  @JoinColumn({ name: 'connectionId' })
  connection?: Connection;

  @Column({ nullable: true })
  connectionId?: string;

  @Column({ type: 'enum', enum: StepType })
  type: StepType;

  @Column({ type: 'jsonb' })
  configJson: StepConfig;

  @Column({ type: 'jsonb' })
  retryPolicy: RetryPolicy;

  @Column()
  order: number;
}
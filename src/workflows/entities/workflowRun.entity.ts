import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Workflow } from "./workflow.entity";
import { WorkflowRunStatus } from "../enums/workflow.enum";

@Entity()
export class WorkflowRun {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Workflow)
  @JoinColumn({ name: 'workflowId' })
  workflow: Workflow;

  @Column()
  workflowId: string;

  @Column({ type: 'enum', enum: WorkflowRunStatus })
  status: WorkflowRunStatus;

  @CreateDateColumn()
  startedAt: Date;

  @Column({ nullable: true })
  finishedAt: Date;
}
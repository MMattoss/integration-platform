import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Workflow } from "./workflow.entity";
import { WorkflowStatus } from "../enums/workflow.enum";

@Entity()
export class WorkflowRun {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Workflow, (workflow) => workflow.id)
  workflowId: string;

  @Column({ type: 'enum', enum: WorkflowStatus })
  status: WorkflowStatus;

  @CreateDateColumn()
  startedAt: Date;

  @Column()
  finishedAt: Date;
}
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Workflow } from "./workflow.entity";
import { WorkflowStatus } from "../enums/workflow.enum";

@Entity()
export class WorkflowRun {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToMany(() => Workflow, (workflow) => workflow.id)
  workflowId: string;

  @Column()
  status: WorkflowStatus;

  @CreateDateColumn()
  startedAt: Date;

  @CreateDateColumn()
  finishedAt: Date;
}
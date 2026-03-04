import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Workflow } from "./workflow.entity";
import { Connection } from "src/connections/entities/connection.entity";
import { StepType } from "../enums/workflow.enum";
import type { RetryPolicy, StepConfig } from "../interfaces/workflow.inteface";

@Entity()
export class WorkflowStep {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToMany(() => Workflow, (workflow) => workflow.id)
  workflowId: string;

  @OneToMany(() => Connection, (connection) => connection.id, { nullable: true })
  connectionId: string;

  @Column()
  type: StepType;

  @Column()
  configJson: StepConfig;

  @Column()
  retryPolicy: RetryPolicy;
}
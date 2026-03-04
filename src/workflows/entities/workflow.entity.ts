import Organization from "src/organizations/entities/organization.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TriggerType, WorkflowStatus } from "../enums/workflow.enum";
import type { TriggerConfig } from "../interfaces/workflow.inteface";

@Entity()
export class Workflow {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToMany(() => Organization, (org) => org.id)
  organizationId: string;

  @Column()
  name: string;

  @Column()
  status: WorkflowStatus;

  @Column()
  triggerType: TriggerType;

  @Column()
  triggerConfig: TriggerConfig;

  @CreateDateColumn()
  createdAt: Date;
}
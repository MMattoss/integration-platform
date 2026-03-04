import Organization from "src/organizations/entities/organization.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TriggerType, WorkflowStatus } from "../enums/workflow.enum";
import type { TriggerConfig } from "../interfaces/workflow.inteface";

@Entity()
export class Workflow {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Organization, (org) => org.id)
  organizationId: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: WorkflowStatus })
  status: WorkflowStatus;

  @Column({ type: 'enum', enum: TriggerType })
  triggerType: TriggerType;

  @Column({ type: 'jsonb' })
  triggerConfig: TriggerConfig;

  @CreateDateColumn()
  createdAt: Date;
}
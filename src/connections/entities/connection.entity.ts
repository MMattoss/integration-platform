import Organization from "src/organizations/entities/organization.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ThirdPartySystem } from "./thirdPartySystem.entity";

@Entity()
export class Connection {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Organization, (org) => org.id)
  organizationId: string;

  @ManyToOne(() => ThirdPartySystem, (tps) => tps.id)  
  thirdPartySystemId: string;

  @Column()
  name: string;

  @Column()
  credentialsEncrypted: string;

  @Column()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
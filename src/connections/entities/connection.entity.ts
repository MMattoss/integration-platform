import Organization from "src/organizations/entities/organization.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ThirdPartySystem } from "./thirdPartySystem.entity";

@Entity()
export class Connection {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Organization, (org) => org.id)
  organizationId: string;

  @ManyToOne(() => ThirdPartySystem)  
  @JoinColumn({ name: 'thirdPartySystemId' })
  thirdPartySystem: ThirdPartySystem;

  @Column()
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
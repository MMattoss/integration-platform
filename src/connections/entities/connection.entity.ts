import Organization from "src/organizations/entities/organization.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ThirdPartySystem } from "./thirdPartySystem.entity";

@Entity()
export class Connection {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToMany(() => Organization, (org) => org.id)
  organizationId: string;

  @OneToMany(() => ThirdPartySystem, (tps) => tps.id)  
  thirdPartySystemId: string;

  @Column()
  name: string;

  @Column()
  credentialsEncrypted: string;

  @CreateDateColumn()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AuthType, ThirdPartyType } from "../enums/connections.enum";

@Entity()
export class ThirdPartySystem {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  type: ThirdPartyType;

  @Column()
  authType: AuthType;

  @Column()
  baseUrl: string;

  @CreateDateColumn()
  createdAt: Date;
}
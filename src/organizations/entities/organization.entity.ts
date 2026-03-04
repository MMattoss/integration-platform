import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import OrganizationUser from './organization-users.entity';

@Entity()
class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => OrganizationUser, (ou) => ou.organization)
  members: OrganizationUser[];

  @CreateDateColumn()
  createdAt: Date;
}

export default Organization;
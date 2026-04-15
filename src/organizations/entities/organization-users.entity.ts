import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import User from 'src/users/user.entity';
import Organization from './organization.entity';
import { Role } from '../../auth/enums/organizationRoles.enum';

@Entity('organization_users')
@Unique(['user', 'organization'])
class OrganizationUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.organizationUsers, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Organization, (organization) => organization.members, {
    onDelete: 'CASCADE',
  })
  organization: Organization;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.MEMBER,
  })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;
}

export default OrganizationUser;
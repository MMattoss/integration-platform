import OrganizationUser from "src/organizations/entities/organization-users.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => OrganizationUser, (ou) => ou.user)
  organizationUsers: OrganizationUser[];

  @CreateDateColumn()
  createdAt: Date;
}

export default User;
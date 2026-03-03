import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import CreateUserDto from 'src/users/dtos/createUser.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import User from 'src/users/user.entity';
import Organization from 'src/organizations/entities/organization.entity';
import OrganizationUser from 'src/organizations/entities/organization-users.entity';
import { OrganizationRole } from 'src/organizations/enums/organizationRoles.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private dataSource: DataSource,
  ) {}

  async signUp(dto: CreateUserDto) {
    const {
      firstName,
      lastName,
      email,
      password,
    } = dto;

    const existingUser = await this.usersService.findOneByEmail(email);
    if(existingUser) throw new ConflictException("Email already in use.");

    const hash = await bcrypt.hash(password, 10);
    return this.dataSource.transaction(async (manager) => {
      const user = manager.create(User, {
        firstName,
        lastName,
        email,
        password: hash,
      });
      await manager.save(user);

      const organization = manager.create(Organization, {
        name: `${firstName}'s Organization`,
      });
      await manager.save(organization);

      const membership = manager.create(OrganizationUser, {
        user,
        organization,
        role: OrganizationRole.OWNER,
      });
      await manager.save(membership);

      return this.signIn(email, password);
    });
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if(!user) throw new NotFoundException("Incorrect user or password");
    
    const passMatch = await bcrypt.compare(password, user.password);
    if(!passMatch) throw new UnauthorizedException("Incorrect user or password");

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

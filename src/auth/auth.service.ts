import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import CreateUserDto from 'src/users/dtos/createUser.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
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
    const user = await this.usersService.createUser({ firstName, lastName, email, password: hash});
    if(user) return this.signIn(email, password);
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

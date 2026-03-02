import { Injectable, NotFoundException } from '@nestjs/common';
import CreateUserDto from './dtos/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import User from './user.entity';
import { Repository } from 'typeorm';
import UpdateUserDto from './dtos/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.usersRepository.find();
  }

  async findOneById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });

    if(!user) throw new NotFoundException("User not found");

    return user;
  };

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    
    const success = await this.usersRepository.save(user);
    return success;
  };

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const { firstName, lastName, email } = updateUserDto;

    const user = await this.findOneById(id);
    if(!user) return null;

    const result = await this.usersRepository.update({ id }, {
      firstName,
      lastName,
      email,
    });

    if(result.affected === 0) throw new Error('Failed to update user');

    return this.findOneById(id);
  };

  deleteUser(id: number) {
    return this.usersRepository.delete({ id });
  };
}

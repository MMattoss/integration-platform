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
    private usersRepo: Repository<User>,
  ) {}

  async findAll() {
    return this.usersRepo.find();
  }

  async findOneById(id: string) {
    const user = await this.usersRepo.findOneBy({ id });

    if(!user) throw new NotFoundException("User not found");

    return user;
  };

  async findOneByEmail(email: string) {
    return await this.usersRepo.findOne({ 
      where: { email },
      relations: [
        'organizationUsers',
        'organizationUsers.organization',
      ],
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = this.usersRepo.create(createUserDto);
    
    const success = await this.usersRepo.save(user);
    return success;
  };

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const { firstName, lastName, email } = updateUserDto;

    const user = await this.findOneById(id);
    if(!user) return null;

    const result = await this.usersRepo.update({ id }, {
      firstName,
      lastName,
      email,
    });

    if(result.affected === 0) throw new Error('Failed to update user');

    return this.findOneById(id);
  };

  deleteUser(id: string) {
    return this.usersRepo.delete({ id });
  };
}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import type CreateUserDto from './dtos/createUser.dto';
import type UpdateUserDto from './dtos/updateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOneById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.findOneById(id);
  }
  
  @Post()
  createUser(
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.createUser(createUserDto);
  }

  @Patch(':id')
  updateUser(
    @Body() updateUser: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.updateUser(id, updateUser);
  }

  @Delete(':id')
  deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.deleteUser(id);
  }
}

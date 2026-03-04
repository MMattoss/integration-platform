import { Body, Controller, Post } from '@nestjs/common';
import type CreateUserDto from 'src/users/dtos/createUser.dto';
import { AuthService } from './auth.service';
import type SignInDto from './dtos/signIn.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('register')
  signUp(
    @Body() dto: CreateUserDto,
  ) {
    return this.authService.signUp(dto);
  }

  @Public()
  @Post('login')
  signIn(
    @Body() dto: SignInDto,
  ) {
    const { email, password } = dto;
    return this.authService.signIn(email, password);
  }
}

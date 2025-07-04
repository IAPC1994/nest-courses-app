import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginUserDto } from './dto';
import { Auth, GetUser } from './decorators';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'User registered', type: User })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'User logged',
    example: {
      id: 'string',
      email: 'string@example.com',
      token: 'string',
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }
}

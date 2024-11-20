import { CreateUserDto } from '@shared/data-objects';
import { UsersService } from './users.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }
}

import { CreateUserDto } from '@shared/data-objects';
import { UsersService } from './users.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('names')
  async getUsernames() {
    return this.usersService.getAllUsernames();
  }

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    await this.usersService.create(user);

    return { status: 'OK' };
  }
}

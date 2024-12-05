import { CreateUserDto, EditUserDto } from '@shared/data-objects';
import { UsersService } from './users.service';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Get('names')
  async getUsernames() {
    return this.usersService.getAllUsernames();
  }

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    await this.usersService.create(user);

    return { status: 'OK' };
  }

  @Patch(':id')
  async editUser(@Param('id') id: string, @Body() user: Partial<EditUserDto>) {
    const userToBeEdited = await this.getUserById(id);
    const editedUser = { ...userToBeEdited, ...user };

    await this.usersService.edit(editedUser);

    return { status: 'OK' };
  }
}

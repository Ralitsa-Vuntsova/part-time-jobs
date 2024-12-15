import { CreateUserDto, EditUserDto } from '@shared/data-objects';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('names')
  getUsernames() {
    return this.usersService.getAllUsernames();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    await this.usersService.create(user);

    return { status: 'OK' };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async editUser(@Param('id') id: string, @Body() user: Partial<EditUserDto>) {
    const userToBeEdited = await this.getUserById(id);
    const editedUser = { ...userToBeEdited, ...user };

    await this.usersService.edit(editedUser);

    return { status: 'OK' };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.usersService.delete(id);

    return { status: 'OK' };
  }
}

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

  @Get()
  getAll() {
    return this.usersService.listAll();
  }

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    await this.usersService.create(user);

    return { status: 'OK' };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async editUser(@Param('id') id: string, @Body() user: EditUserDto) {
    const userToBeEdited = await this.usersService.getFullUserObject(id);
    const editedUser = { ...userToBeEdited, ...user };

    await this.usersService.edit(editedUser);

    return { status: 'OK' };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    await this.usersService.delete(id);

    return { status: 'OK' };
  }
}

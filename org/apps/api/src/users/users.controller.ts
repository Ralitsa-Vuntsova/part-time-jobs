import { AuthUser, CreateUserDto, EditUserDto } from '@shared/data-objects';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../decorators/user-decorator';

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
  getUsersByIds(@Query('ids') ids: string) {
    if (ids === '') {
      return [];
    }

    return this.usersService.list(ids.split(','));
  }

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    await this.usersService.create(user);

    return { status: 'OK' };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async editUser(
    @Param('id') id: string,
    @Body() user: EditUserDto,
    @User() requestUser: AuthUser
  ) {
    if (id !== requestUser.userId) {
      throw new ForbiddenException('Cannot modify user, no permissions');
    }

    const userToBeEdited = await this.usersService.getFullUserObject(id);
    const editedUser = { ...userToBeEdited, ...user };

    await this.usersService.edit(editedUser);

    return { status: 'OK' };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string, @User() requestUser: AuthUser) {
    if (id !== requestUser.userId) {
      throw new ForbiddenException('Cannot delete user, no permissions');
    }

    await this.usersService.delete(id);

    return { status: 'OK' };
  }
}

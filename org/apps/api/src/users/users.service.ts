import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  UserDocument,
  User,
  UserDto,
  CreateUserDto,
} from '@shared/data-objects';
import { dbToInstance } from '../lib/utils';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(username: string): Promise<UserDto> {
    return (await this.userModel.findOne({ username }));
  }

  async getAllUsernames(): Promise<string[]> {
    return (await this.userModel.find({}, 'username')).map((user) => user.username);
  }

  async create(user: CreateUserDto) {
    const salt = await genSalt();
    const hashedPassword = await hash(user.password, salt);

    return dbToInstance(
      UserDto,
      this.userModel.create({ ...user, password: hashedPassword })
    );
  }
}

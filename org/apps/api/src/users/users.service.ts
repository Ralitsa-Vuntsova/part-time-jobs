import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  UserDocument,
  User,
  UserDto,
  CreateUserDto,
  UserProfile,
} from '@shared/data-objects';
import { dbToInstance } from '../lib/utils';
import { genSalt, hash } from 'bcrypt';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(username: string): Promise<UserDto> {
    return dbToInstance(UserDto, this.userModel.findOne({ username }));
  }

  async findById(id: string): Promise<UserDto> {
    return dbToInstance(UserProfile, this.userModel.findOne({ _id: id }));
  }

  async getAllUsernames(): Promise<string[]> {
    return (await this.userModel.find({}, 'username')).map(
      (user) => user.username
    );
  }

  async create(user: CreateUserDto) {
    const salt = await genSalt();
    const hashedPassword = await hash(user.password, salt);

    return dbToInstance(
      UserDto,
      this.userModel.create({ ...user, password: hashedPassword })
    );
  }

  async edit(user: UserDto) {
    return dbToInstance(
      UserDto,
      this.userModel.findOneAndReplace({ _id: user._id }, user, {
        returnDocument: 'after',
      })
    );
  }

  delete(id: string) {
    return this.userModel.findByIdAndDelete({ _id: id });
  }
}

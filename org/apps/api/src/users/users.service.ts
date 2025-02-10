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

  findOne(username: string): Promise<UserDto> {
    return dbToInstance(UserDto, this.userModel.findOne({ username }));
  }

  findById(id: string): Promise<UserProfile> {
    return dbToInstance(UserProfile, this.userModel.findOne({ _id: id }));
  }

  getFullUserObject(id: string): Promise<UserDto> {
    return dbToInstance(UserDto, this.userModel.findOne({ _id: id }));
  }

  async listAll(): Promise<UserProfile[]> {
    return (await this.userModel.find({})).map((user) => ({
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
    }));
  }

  async getAllUsernames(): Promise<string[]> {
    return (await this.userModel.find({}, 'username')).map(
      (user) => user.username
    );
  }

  async create(user: CreateUserDto): Promise<UserDto> {
    const salt = await genSalt();
    const hashedPassword = await hash(user.password, salt);

    return dbToInstance(
      UserDto,
      this.userModel.create({ ...user, password: hashedPassword })
    );
  }

  edit(user: UserDto): Promise<UserDto> {
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

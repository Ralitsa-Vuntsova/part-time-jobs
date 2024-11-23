import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDto } from './base.dto';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { OmitType, PickType } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'users', timestamps: true })
export class User extends BaseDto {
  @IsNotEmpty()
  @IsMongoId()
  _id!: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  username!: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  password!: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  email!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;

export class UserDto extends User {}

export class CreateUserDto extends OmitType(User, [
  '_id',
  'createdAt',
  'updatedAt',
  'createdBy',
  'updatedBy',
]) {}

export class LoginUserDto extends PickType(User, ['username', 'password']) {}

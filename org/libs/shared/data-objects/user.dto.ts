import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDto } from './base.dto';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { OmitType } from '@nestjs/swagger';
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

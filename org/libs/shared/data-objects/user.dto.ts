import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { OmitType, PickType } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'users', timestamps: true })
export class User {
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

  @Prop()
  @IsString()
  @IsNotEmpty()
  phoneNumber?: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  address?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;

export class UserDto extends User {}

export class CreateUserDto extends OmitType(User, ['_id']) {}

export class EditUserDto extends OmitType(User, [
  '_id',
  'username',
  'password',
]) {}

export class LoginUserDto extends PickType(User, ['username', 'password']) {}

export class ResultUserDto extends PickType(User, [
  '_id',
  'username',
  'email',
]) {}

export class UserProfile extends OmitType(User, ['password']) {}

export class AuthUser {
  userId!: string;
  username!: string;
}

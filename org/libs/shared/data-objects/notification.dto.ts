import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { BaseDto } from './base.dto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { OmitType } from '@nestjs/swagger';

@Schema({ collection: 'push-notifications', timestamps: true })
export class Notification extends BaseDto {
  @IsNotEmpty()
  @IsMongoId()
  _id!: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  message!: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  redirectUrl!: string;

  @Prop()
  @IsBoolean()
  @IsOptional()
  isRead?: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
export type NotificationDocument = HydratedDocument<Notification>;

export class NotificationDto extends Notification {}

export class CreateNotificationDto extends OmitType(Notification, [
  '_id',
  'isRead',
  'createdAt',
  'updatedAt',
  'createdBy',
  'updatedBy',
]) {}

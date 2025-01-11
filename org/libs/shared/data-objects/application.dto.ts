import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BaseDto } from './base.dto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OmitType } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'applications', timestamps: true })
export class Application extends BaseDto {
  @IsNotEmpty()
  @IsMongoId()
  _id!: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  adId!: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  reason!: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  dateTime!: string;

  @Prop()
  @IsNumber()
  @IsNotEmpty()
  personNumber!: number;

  @Prop()
  @IsString()
  @IsOptional()
  additionalInformation?: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
export type ApplicationDocument = HydratedDocument<Application>;

export class ApplicationDto extends Application {}

export class CreateApplicationDto extends OmitType(ApplicationDto, [
  '_id',
  'createdAt',
  'updatedAt',
  'createdBy',
  'updatedBy',
]) {}

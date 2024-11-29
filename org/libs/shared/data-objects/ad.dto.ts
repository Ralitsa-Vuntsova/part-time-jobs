import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { OmitType } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { BaseDto } from './base.dto';
import { ContactDto } from './contact.dto';
import { Type } from 'class-transformer';

@Schema({ collection: 'ads', timestamps: true })
export class Ad extends BaseDto {
  @IsNotEmpty()
  @IsMongoId()
  _id!: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  description!: string;

  @Prop()
  @IsString()
  @IsOptional()
  additionalInformation?: string;

  @Prop()
  @ValidateNested({ each: true })
  @Type(() => ContactDto)
  contacts!: ContactDto[];
}

export const AdSchema = SchemaFactory.createForClass(Ad);
export type AdDocument = HydratedDocument<Ad>;

export class AdDto extends Ad {}

export class CreateAdDto extends OmitType(Ad, [
  '_id',
  'createdAt',
  'updatedAt',
  'createdBy',
  'updatedBy',
]) {}

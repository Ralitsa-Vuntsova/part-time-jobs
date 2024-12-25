import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AdDto } from './ad.dto';
import { OmitType } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DateTimeDto } from './date-time.dto';

@Schema({ collection: 'job-offers', timestamps: true })
export class JobOffer extends AdDto {
  @Prop()
  @IsString()
  @IsNotEmpty()
  duration!: string;

  @Prop()
  @IsNumber()
  @IsNotEmpty()
  personNumber!: number;

  @Prop()
  @IsString()
  @IsNotEmpty()
  qualification!: string;

  @Prop()
  @IsString()
  @IsOptional()
  urgency?: string;

  @Prop()
  @IsString()
  @IsOptional()
  difficulty?: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  location!: string;

  @Prop()
  @Prop()
  @ValidateNested({ each: true })
  @Type(() => DateTimeDto)
  dateTime!: DateTimeDto[];
}

export const JobOfferSchema = SchemaFactory.createForClass(JobOffer);
export type JobOfferDocument = HydratedDocument<JobOffer>;

export class JobOfferDto extends JobOffer {}

export class CreateJobOfferDto extends OmitType(JobOffer, [
  '_id',
  'isArchieved',
  'createdAt',
  'updatedAt',
  'createdBy',
  'updatedBy',
]) {}

export class EditJobOfferDto extends OmitType(JobOfferDto, [
  '_id',
  'createdAt',
  'updatedAt',
  'createdBy',
  'updatedBy',
]) {}

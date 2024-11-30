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

@Schema({ collection: 'offer-ads', timestamps: true })
export class OfferAd extends AdDto {
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

export const OfferAdSchema = SchemaFactory.createForClass(OfferAd);
export type OfferAdDocument = HydratedDocument<OfferAd>;

export class OfferAdDto extends OfferAd {}

export class CreateOfferAdDto extends OmitType(OfferAd, [
  '_id',
  'createdAt',
  'updatedAt',
  'createdBy',
  'updatedBy',
]) {}

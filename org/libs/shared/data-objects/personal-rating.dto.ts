import { IsBoolean, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from './base.dto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { OmitType } from '@nestjs/swagger';

@Schema({ collection: 'personal-ratings', timestamps: true })
export class PersonalRating extends BaseDto {
  @IsNotEmpty()
  @IsMongoId()
  _id!: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  comment!: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  adId!: string;
}

export const PersonalRatingSchema =
  SchemaFactory.createForClass(PersonalRating);
export type PersonalRatingDocument = HydratedDocument<PersonalRating>;

export class PersonalRatingDto extends PersonalRating {}

export class CreatePersonalRatingDto extends OmitType(PersonalRatingDto, [
  '_id',
  'createdAt',
  'updatedAt',
  'createdBy',
  'updatedBy',
]) {}

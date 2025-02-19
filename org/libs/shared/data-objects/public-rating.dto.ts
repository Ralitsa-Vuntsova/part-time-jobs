import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OmitType, PartialType } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { PersonalRating } from './personal-rating.dto';

@Schema({ collection: 'public-ratings', timestamps: true })
export class PublicRating extends PersonalRating {
  @Prop()
  @IsNumber()
  @IsNotEmpty()
  rateValue!: number;
}

export const PublicRatingSchema = SchemaFactory.createForClass(PublicRating);
export type PublicRatingDocument = HydratedDocument<PublicRating>;

export class PublicRatingDto extends PublicRating {}

export class CreatePublicRatingDto extends OmitType(PublicRating, [
  '_id',
  'createdAt',
  'updatedAt',
  'createdBy',
  'updatedBy',
]) {}

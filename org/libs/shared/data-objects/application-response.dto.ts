import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BaseDto } from './base.dto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { OmitType } from '@nestjs/swagger';
import { ApplicationResponse as Response } from '@shared/enums';

@Schema({ collection: 'application-responses', timestamps: true })
export class ApplicationResponse extends BaseDto {
  @IsNotEmpty()
  @IsMongoId()
  _id!: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  applicationId!: string;

  @Prop()
  @IsNumber()
  @IsOptional()
  personNumber?: number;

  @Prop({ type: String, enum: Response })
  @IsNotEmpty()
  @IsEnum(Response)
  response!: Response;
}

export const ApplicationResponseSchema =
  SchemaFactory.createForClass(ApplicationResponse);
export type ApplicationResponseDocument = HydratedDocument<ApplicationResponse>;

export class ApplicationResponseDto extends ApplicationResponse {}

export class CreateApplicationResponseDto extends OmitType(
  ApplicationResponseDto,
  ['_id', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy']
) {}

import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BaseDto } from './base.dto';
import { Prop } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { ContactDto } from './contact.dto';

export class AdDto extends BaseDto {
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

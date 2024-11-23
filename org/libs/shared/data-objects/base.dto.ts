import { Prop, Schema } from '@nestjs/mongoose';
import { IsISO8601, IsOptional } from 'class-validator';
import { UserDto } from './user.dto';
import { Type } from 'class-transformer';

@Schema({ _id: false })
export class BaseDto {
  @IsISO8601()
  createdAt!: string;

  @IsOptional()
  @IsISO8601()
  updatedAt?: string;

  // TODO: Handle these
  @Prop({ type: String })
  @Type(() => UserDto['_id'])
  createdBy!: UserDto['_id'];

  @Prop({ type: String })
  @IsOptional()
  @Type(() => UserDto['_id'])
  updatedBy?: UserDto['_id'];
}

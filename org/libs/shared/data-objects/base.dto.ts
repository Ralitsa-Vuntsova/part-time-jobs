import { Prop, Schema } from '@nestjs/mongoose';
import { IsISO8601, IsOptional } from 'class-validator';
import { UserDto } from './user.dto';

@Schema({ _id: false })
export class BaseDto {
  @IsISO8601()
  createdAt!: string;

  @IsOptional()
  @IsISO8601()
  updatedAt?: string;

  @Prop({ type: String })
  createdBy!: UserDto['_id'];

  @Prop({ type: String })
  @IsOptional()
  updatedBy?: UserDto['_id'];
}

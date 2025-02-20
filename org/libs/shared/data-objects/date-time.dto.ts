import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { transformDate } from './utils';

// Currently not used
@Schema({ _id: false })
export class DateTimeDto {
  @Prop()
  @IsString()
  @IsNotEmpty()
  time!: string;

  @MaxLength(10)
  @IsISO8601()
  @Prop({ type: Date, transform: transformDate })
  @ApiProperty({ type: 'string', format: 'date' })
  date!: string;
}

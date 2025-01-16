import { Prop, Schema } from '@nestjs/mongoose';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

@Schema({ _id: false })
export class PersonNumberDto {
  @Prop()
  @IsNumber()
  @IsNotEmpty()
  value!: number;

  @Prop()
  @IsBoolean()
  @IsNotEmpty()
  notSure!: boolean;
}

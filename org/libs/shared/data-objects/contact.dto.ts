import { Prop, Schema } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';

@Schema({ _id: false })
export class ContactDto {
  @Prop()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  email!: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  address!: string;
}

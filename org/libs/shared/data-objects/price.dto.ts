import { Prop, Schema } from '@nestjs/mongoose';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Currency, Payment } from '../enums/price-enums';

@Schema({ _id: false })
export class PriceDto {
  @Prop()
  @IsNumber()
  @IsNotEmpty()
  value!: number;

  @Prop({ type: String, enum: Currency })
  @IsEnum(Currency)
  currency!: Currency;

  @Prop({ type: String, enum: Payment })
  @IsEnum(Payment)
  payment!: Payment;

  @Prop()
  @IsBoolean()
  @IsNotEmpty()
  byNegotiation!: boolean;
}

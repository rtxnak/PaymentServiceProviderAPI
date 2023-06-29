import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { PaymentMethod } from '../../enums/paymentMethod.enum';

export class NewPayableDTO {
  @IsNumber()
  transactionId: number;

  @IsNumber()
  amount: number;

  @IsEnum(PaymentMethod)
  @IsString()
  paymentMethod: string;

  @IsDate()
  createdAt: Date;
}

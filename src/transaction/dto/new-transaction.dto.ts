import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaymentMethod } from '../../enums/paymentMethod.enum';

export class NewTransactionDTO {
  @IsNumber()
  amount: number;

  @IsString()
  description: string;

  @IsEnum(PaymentMethod)
  @IsString()
  paymentMethod: string;

  @IsString()
  cardNumber: string;

  @IsString()
  cardOwnerName: string;

  @IsString()
  cardExpirationDate: string;

  @IsNumber()
  cardVerificationCode: string;

  @IsNumber()
  @IsOptional()
  customerId?: number;

  @IsNumber()
  companyId: number;
}

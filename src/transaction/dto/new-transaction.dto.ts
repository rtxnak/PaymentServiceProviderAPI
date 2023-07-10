import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaymentMethod } from '../../enums/paymentMethod.enum';
import { ApiProperty } from '@nestjs/swagger';

export class NewTransactionDTO {
  @ApiProperty({
    example: 1000.55,
    description: `amount value of the transaction, it's a float number.`,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: 'XYZ smartphone 3.0',
    description: `the description of transaction reason, just used for display.`,
  })
  @IsString()
  description: string;

  @ApiProperty({
    enum: [PaymentMethod.creditCard, PaymentMethod.debitCard],
    example: PaymentMethod.creditCard,
    description: `the payment method can be just credit_card or debit_card, necessary to calc payment fees and availability.`,
  })
  @IsEnum(PaymentMethod)
  @IsString()
  paymentMethod: string;

  @ApiProperty({
    example: '4716233447941653',
    description: `full number of credit or debit card, no necessary dots or dashes, just used for display --IMPORTANT it just recorded the 4 last number on the database.`,
  })
  @IsString()
  cardNumber: string;

  @ApiProperty({
    example: 'Rafael Nakashima',
    description: `full name on credit or debit card, just used for display`,
  })
  @IsString()
  cardOwnerName: string;

  @ApiProperty({
    example: '9/2026',
    description: `expiration date on credit or debit card, just used for display`,
  })
  @IsString()
  cardExpirationDate: string;

  @ApiProperty({
    example: '807',
    description: `verification code on credit or debit card, just used for display`,
  })
  @IsNumber()
  cardVerificationCode: string;

  @ApiProperty({
    example: 1,
    description: `the customerId is taken from the logged in user's information, it is not necessary to inform directly.`,
  })
  @IsNumber()
  @IsOptional()
  customerId?: number;

  @ApiProperty({
    example: 2,
    description: `the companyId is a valid and registered id on database.`,
  })
  @IsNumber()
  companyId: number;
}

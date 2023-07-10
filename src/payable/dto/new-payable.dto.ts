import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { PaymentMethod } from '../../enums/paymentMethod.enum';
import { ApiProperty } from '@nestjs/swagger';

export class NewPayableDTO {
  @ApiProperty({
    example: 1,
    description: `related transaction id.`,
  })
  @IsNumber()
  transactionId: number;

  @ApiProperty({
    example: 1000.55,
    description: `related transaction replicated information`,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    enum: [PaymentMethod.creditCard, PaymentMethod.debitCard],
    example: PaymentMethod.creditCard,
    description: `related transaction replicated information`,
  })
  @IsEnum(PaymentMethod)
  @IsString()
  paymentMethod: string;

  @IsDate()
  createdAt: Date;
}

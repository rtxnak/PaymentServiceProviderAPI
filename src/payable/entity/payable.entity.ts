import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TransactionEntity } from '../../transaction/entity/transaction.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'payables',
})
export class PayableEntity {
  @ApiProperty({
    example: 1,
  })
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id?: number;

  @ApiProperty({
    example: '2023-08-05T23:24:00.000Z',
    description: `date calculated for payment, if the payment method is a debit card, it will be D+0, and if it is a credit card, it will be D+30`,
  })
  @Column({
    name: 'payment_date',
  })
  paymentDate: Date;

  @ApiProperty({
    example: 50.03,
    description: `fee calculated to discount on payment, if the payment method is a debit card, it will be 3% from amount, and if it is a credit card, it will be 5% from amount`,
  })
  @Column('decimal', {
    name: 'fee_value',
    precision: 6,
    scale: 2,
  })
  feeValue: number;

  @ApiProperty({
    example: 950.52,
    description: `amount already discounted according to the payment method`,
  })
  @Column('decimal', {
    name: 'payable_amount',
    precision: 6,
    scale: 2,
  })
  payableAmount: number;

  @ApiProperty({
    example: 1,
    description: `related transaction id.`,
  })
  @OneToOne(() => TransactionEntity, (transaction) => transaction.id)
  @JoinColumn({
    name: 'transaction_id',
  })
  transactionId: number;

  @ApiProperty({
    example: 'waiting_funds',
    description: `If the payment date is less than the current date, the status will be "paid", and if the date is greater, it will be "waiting_funds"`,
  })
  status?: string;
}

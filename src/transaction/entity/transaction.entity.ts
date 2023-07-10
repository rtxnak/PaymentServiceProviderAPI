import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { PaymentMethod } from '../../enums/paymentMethod.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'transactions',
})
export class TransactionEntity {
  @ApiProperty({
    example: 1,
  })
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id?: number;

  @ApiProperty({
    example: 1000.55,
  })
  @Column('decimal', { precision: 6, scale: 2 })
  amount: number;

  @ApiProperty({
    example: 'XYZ smartphone 3.0',
  })
  @Column({
    length: 127,
  })
  description: string;

  @ApiProperty({
    example: PaymentMethod.creditCard,
  })
  @Column({
    name: 'payment_method',
    type: 'enum',
    enum: PaymentMethod,
  })
  paymentMethod: string;

  @ApiProperty({
    example: '1653',
  })
  @Column({
    name: 'card_number',
    length: 4,
  })
  cardNumber: string;

  @ApiProperty({
    example: 'Rafael Nakashima',
  })
  @Column({
    name: 'card_owner_name',
    length: 127,
  })
  cardOwnerName: string;

  @ApiProperty({
    example: '9/2026',
  })
  @Column({
    name: 'card_exp_date',
  })
  cardExpirationDate: string;

  @ApiProperty({
    example: '807',
  })
  @Column({
    name: 'card_verification_code',
    length: 3,
  })
  cardVerificationCode: string;

  @ApiProperty({
    example: 1,
  })
  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({
    name: 'customer_id',
  })
  customerId: number;

  @ApiProperty({
    example: 2,
  })
  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({
    name: 'company_id',
  })
  companyId: number;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

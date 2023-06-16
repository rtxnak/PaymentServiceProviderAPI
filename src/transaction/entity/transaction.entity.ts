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

@Entity({
  name: 'transactions',
})
export class TransactionEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id?: number;
  @Column('decimal', { precision: 6, scale: 2 })
  amount: number;
  @Column({
    length: 127,
  })
  description: string;
  @Column({
    name: 'payment_method',
    type: 'enum',
    enum: PaymentMethod,
  })
  paymentMethod: string;
  @Column({
    name: 'card_number',
    length: 4,
  })
  cardNumber: string;
  @Column({
    name: 'card_owner_name',
    length: 127,
  })
  cardOwnerName: string;
  @Column({
    name: 'card_exp_date',
  })
  cardExpirationDate: string;
  @Column({
    name: 'card_verification_code',
    length: 3,
  })
  cardVerificationCode: string;
  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({
    name: 'customer_id',
  })
  customerId: number;
  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({
    name: 'company_id',
  })
  companyId: number;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

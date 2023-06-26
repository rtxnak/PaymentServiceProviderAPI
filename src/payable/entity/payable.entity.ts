import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TransactionEntity } from '../../transaction/entity/transaction.entity';

@Entity({
  name: 'payables',
})
export class PayableEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id?: number;
  @Column({
    name: 'payment_date',
  })
  paymentDate: Date;
  @Column('decimal', {
    name: 'fee_value',
    precision: 6,
    scale: 2,
  })
  feeValue: number;
  @Column('decimal', {
    name: 'payable_amount',
    precision: 6,
    scale: 2,
  })
  payableAmount: number;
  @OneToOne(() => TransactionEntity, (transaction) => transaction.id)
  @JoinColumn({
    name: 'transaction_id',
  })
  transactionId: number;
}

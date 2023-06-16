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
  @Column({
    name: 'fee_value',
  })
  feeValue: number;
  @Column({
    name: 'payable_amount',
  })
  payableAmount: number;
  @OneToOne(() => TransactionEntity, (transaction) => transaction.id)
  @JoinColumn({
    name: 'transaction_id',
  })
  transactionId: number;
}

import { Injectable } from '@nestjs/common';
import { PayableEntity } from './entity/payable.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from '../enums/paymentMethod.enum';
import { PayableTerm } from '../enums/payableTerm.enum';
import { PayableTax } from '../enums/payableTax.enum';

@Injectable()
export class PayableService {
  constructor(
    @InjectRepository(PayableEntity)
    private payableRepository: Repository<PayableEntity>,
  ) {}

  async createNewPayable(
    transactionId: number,
    amount: number,
    paymentMethod: string,
    createdAt: Date,
  ) {
    const date = new Date(createdAt);
    const paymentDate =
      paymentMethod === PaymentMethod.creditCard
        ? new Date(date.setDate(date.getDate() + PayableTerm.creditCard))
        : new Date(date.setDate(date.getDate() + PayableTerm.debitCard));

    const feeValue =
      paymentMethod === PaymentMethod.creditCard
        ? amount * PayableTax.creditCard
        : amount * PayableTax.debitCard;

    const payableAmount = amount - feeValue;

    const payable = this.payableRepository.create({
      paymentDate,
      feeValue,
      payableAmount,
      transactionId,
    });
    return this.payableRepository.save(payable);
  }
}
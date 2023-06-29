import { Injectable } from '@nestjs/common';
import { PayableEntity } from './entity/payable.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from '../enums/paymentMethod.enum';
import { PayableTerm } from '../enums/payableTerm.enum';
import { PayableTax } from '../enums/payableTax.enum';
import { UserEntity } from '../user/entity/user.entity';
import { NewPayableDTO } from './dto/new-payable.dto';

@Injectable()
export class PayableService {
  constructor(
    @InjectRepository(PayableEntity)
    private payableRepository: Repository<PayableEntity>,
  ) {}

  async createNewPayable({
    transactionId,
    amount,
    createdAt,
    paymentMethod,
  }: NewPayableDTO) {
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

  async listAllPayableDetailsFromCompany(userInfo: UserEntity) {
    const results = await this.payableRepository
      .createQueryBuilder('payable')
      .innerJoin('payable.transactionId', 'transaction')
      .where('transaction.companyId = :id', { id: userInfo.id })
      .getMany();

    results.forEach((result) => {
      const today = Date.now();
      if (new Date(result.paymentDate) >= new Date(today)) {
        result['status'] = 'waiting_funds';
      } else {
        result['status'] = 'paid';
      }
    });
    return results;
  }

  async listBalanceFromCompany(userInfo: UserEntity) {
    const payables = await this.listAllPayableDetailsFromCompany(userInfo);
    const payablesPaid = payables.filter(
      (payable) => payable.status === 'paid',
    );
    const payablesWaitingFunds = payables.filter(
      (payable) => payable.status === 'waiting_funds',
    );
    const paidBalance = payablesPaid.reduce(
      (result, payable) => (result += Number(payable.payableAmount)),
      0,
    );
    const waitingFundsBalance = payablesWaitingFunds.reduce(
      (result, payable) => (result += Number(payable.payableAmount)),
      0,
    );
    return {
      balance: {
        available: paidBalance,
        waiting_funds: waitingFundsBalance,
      },
    };
  }
}

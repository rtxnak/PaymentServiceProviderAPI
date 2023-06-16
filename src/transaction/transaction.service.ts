import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from './entity/transaction.entity';
import { NewTransactionDTO } from './dto/new-transaction.dto';
import { UserEntity } from '../user/entity/user.entity';
import { PayableService } from '../payable/payable.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionsRepository: Repository<TransactionEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly payableService: PayableService,
  ) {}

  async createNewTransaction(data: NewTransactionDTO, userInfo: UserEntity) {
    data.cardNumber = data.cardNumber.slice(-4);
    data.customerId = userInfo.id;
    if (
      await this.usersRepository.exist({
        where: {
          id: data.companyId,
        },
      })
    ) {
      const transaction = this.transactionsRepository.create(data);
      const transactionCreated = await this.transactionsRepository.save(
        transaction,
      );
      await this.payableService.createNewPayable(
        transactionCreated.id,
        transactionCreated.amount,
        transactionCreated.paymentMethod,
        transactionCreated.createdAt,
      );
      return transactionCreated;
    } else {
      throw new BadRequestException('Compania não existente');
    }
  }

  async listAllTransactionsFromCustomer(userInfo: UserEntity) {
    const result = await this.transactionsRepository
      .createQueryBuilder('transaction')
      .where({
        customerId: userInfo.id,
      })
      .getMany();
    return result;
  }

  async listAllTransactionsFromCompany(userInfo: UserEntity) {
    const result = await this.transactionsRepository
      .createQueryBuilder('transaction')
      .where({
        companyId: userInfo.id,
      })
      .getMany();
    return result;
  }
}

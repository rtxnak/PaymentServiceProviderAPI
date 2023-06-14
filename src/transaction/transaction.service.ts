import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from './entity/transaction.entity';
import { NewTransactionDTO } from './dto/new-transaction.dto';
import { UserEntity } from '../user/entity/user.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionsRepository: Repository<TransactionEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
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
      return this.transactionsRepository.save(transaction);
    }
    throw new BadRequestException('Compania não existente');
  }

  async listAllTransactions(userInfo: UserEntity) {
    const result = await this.transactionsRepository
      .createQueryBuilder('transaction')
      .where({
        customerId: userInfo.id,
      })
      .getMany();
    return result;
  }
}

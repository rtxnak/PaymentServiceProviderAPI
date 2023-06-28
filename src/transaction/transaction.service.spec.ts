import { Repository } from 'typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { TransactionService } from './transaction.service';
import { TransactionEntity } from './entity/transaction.entity';
import { userRepositoryMock } from '../testing/user-repository.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { transactionsRepositoryMock } from '../testing/transactions-repository.mock';
import { PayableServiceMock } from '../testing/payable-service.mock';
import { NewTransactionDTOMock } from '../testing/new-transaction-dto.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { transactionEntityListMock } from '../testing/transaction-entity-list.mock';
import { BadRequestException } from '@nestjs/common';

describe('TransactionService unit test', () => {
  let transactionService: TransactionService;
  let userRepository: Repository<UserEntity>;
  let transactionsRepository: Repository<TransactionEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        PayableServiceMock,
        userRepositoryMock,
        transactionsRepositoryMock,
      ],
    }).compile();

    transactionService = module.get<TransactionService>(TransactionService);
    userRepository = module.get(getRepositoryToken(UserEntity));
    transactionsRepository = module.get(getRepositoryToken(TransactionEntity));
  });

  test('modules definition', () => {
    expect(transactionService).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(transactionsRepository).toBeDefined();
  });

  describe('createNewTransaction method', () => {
    test('SUCCESS on create new transaction', async () => {
      const result = await transactionService.createNewTransaction(
        NewTransactionDTOMock,
        userEntityList[0],
      );

      expect(result).toEqual(transactionEntityListMock[0]);
    });

    test('FAILURE on create new transaction', async () => {
      jest.spyOn(userRepository, 'exist').mockResolvedValueOnce(false);

      await expect(
        transactionService.createNewTransaction(
          NewTransactionDTOMock,
          userEntityList[0],
        ),
      ).rejects.toEqual(new BadRequestException('Compania não existente'));
    });
  });

  describe('listAllTransactions methods', () => {
    test('SUCCESS on list all transactions from Customer', async () => {
      const result = await transactionService.listAllTransactionsFromCustomer(
        userEntityList[0],
      );
      expect(result).toEqual(transactionEntityListMock);
    });
  });

  describe('listAllTransactions methods', () => {
    test('SUCCESS on list all transactions from Company', async () => {
      const result = await transactionService.listAllTransactionsFromCompany(
        userEntityList[2],
      );
      expect(result).toEqual(transactionEntityListMock);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { AuthGuard } from '../guards/auth.guard';
import { guardMock } from '../testing/guard.mock';
import { transactionServiceMock } from '../testing/transaction-service.mock';
import { NewTransactionDTOMock } from '../testing/new-transaction-dto.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { transactionEntityListMock } from '../testing/transaction-entity-list.mock';

describe('TransactionController unit test', () => {
  let transactionController: TransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [transactionServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .compile();

    transactionController = module.get<TransactionController>(
      TransactionController,
    );
  });

  test('module definition', () => {
    expect(transactionController).toBeDefined();
  });

  describe('create method', () => {
    test('SUCCESS on create new transaction', async () => {
      const result = await transactionController.create(
        NewTransactionDTOMock,
        userEntityList[0],
      );

      expect(result).toEqual(transactionEntityListMock[0]);
    });
  });

  describe('listAllTransactions methods', () => {
    test('SUCCESS on list all transactions from Customer', async () => {
      const result =
        await transactionController.listAllTransactionsFromCustomer(
          userEntityList[0],
        );
      expect(result).toEqual(transactionEntityListMock);
    });
  });

  describe('listAllTransactions methods', () => {
    test('SUCCESS on list all transactions from Company', async () => {
      const result = await transactionController.listAllTransactionsFromCompany(
        userEntityList[2],
      );
      expect(result).toEqual(transactionEntityListMock);
    });
  });
});

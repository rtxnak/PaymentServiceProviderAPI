import { TransactionService } from '../transaction/transaction.service';
import { transactionEntityListMock } from './transaction-entity-list.mock';

export const transactionServiceMock = {
  provide: TransactionService,
  useValue: {
    createNewTransaction: jest
      .fn()
      .mockResolvedValue(transactionEntityListMock[0]),
    listAllTransactionsFromCustomer: jest
      .fn()
      .mockResolvedValue(transactionEntityListMock),
    listAllTransactionsFromCompany: jest
      .fn()
      .mockResolvedValue(transactionEntityListMock),
  },
};

import { getRepositoryToken } from '@nestjs/typeorm';
import { TransactionEntity } from '../transaction/entity/transaction.entity';
import { transactionEntityListMock } from './transaction-entity-list.mock';

export const transactionsRepositoryMock = {
  provide: getRepositoryToken(TransactionEntity),
  useValue: {
    create: jest.fn(),
    save: jest.fn().mockResolvedValue(transactionEntityListMock[0]),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(transactionEntityListMock),
    })),
  },
};

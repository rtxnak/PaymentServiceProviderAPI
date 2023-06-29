import { getRepositoryToken } from '@nestjs/typeorm';
import { PayableEntity } from '../payable/entity/payable.entity';
import { payableEntityListMock } from './payable-entity-list.mock';

export const payableRepositoryMock = {
  provide: getRepositoryToken(PayableEntity),
  useValue: {
    create: jest.fn(),
    save: jest.fn().mockResolvedValue(payableEntityListMock[0]),
    createQueryBuilder: jest.fn(() => ({
      innerJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(payableEntityListMock),
    })),
  },
};

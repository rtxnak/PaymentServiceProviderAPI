import { Test, TestingModule } from '@nestjs/testing';
import { PayableService } from './payable.service';
import { PayableEntity } from './entity/payable.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { payableRepositoryMock } from '../testing/payable-repository.mock';
import { payableEntityListMock } from '../testing/payable-entity-list.mock';
import { NewPayableDTOmock } from '../testing/new-payable-dto.mock';
import { userEntityList } from '../testing/user-entity-list.mock';

describe('PayableService unit test', () => {
  let payableService: PayableService;
  let payableRepository: Repository<PayableEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayableService, payableRepositoryMock],
    }).compile();

    payableService = module.get<PayableService>(PayableService);
    payableRepository = module.get(getRepositoryToken(PayableEntity));
  });

  test('modules definition', () => {
    expect(payableService).toBeDefined();
    expect(payableRepository).toBeDefined();
  });

  describe('createNewPayable method', () => {
    test('SUCCESS on create new payable', async () => {
      const result = await payableService.createNewPayable(NewPayableDTOmock);

      expect(result).toEqual(payableEntityListMock[0]);
    });
  });

  describe('listAllPayableDetailsFromCompany method', () => {
    test('SUCCESS on list all payble details from company', async () => {
      const result = await payableService.listAllPayableDetailsFromCompany(
        userEntityList[2],
      );

      expect(result).toEqual(payableEntityListMock);
    });
  });

  describe('listBalanceFromCompany method', () => {
    test('SUCCESS on list balance from company', async () => {
      const result = await payableService.listBalanceFromCompany(
        userEntityList[2],
      );

      expect(result).toEqual({
        balance: { available: 0, waiting_funds: 12696.19 },
      });
    });
  });
});

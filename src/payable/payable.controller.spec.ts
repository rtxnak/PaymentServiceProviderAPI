import { Test, TestingModule } from '@nestjs/testing';
import { PayableController } from './payable.controller';
import { PayableServiceMock } from '../testing/payable-service.mock';
import { AuthGuard } from '../guards/auth.guard';
import { guardMock } from '../testing/guard.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { payableEntityListMock } from '../testing/payable-entity-list.mock';

describe('PayableController unit test', () => {
  let payableController: PayableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayableController],
      providers: [PayableServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .compile();

    payableController = module.get<PayableController>(PayableController);
  });

  test('module definition', () => {
    expect(PayableController).toBeDefined();
  });

  describe('listAllPayableDetailsFromCompany method', () => {
    test('SUCCESS on list all payble details from company', async () => {
      const result = await payableController.listAllPayableDetailsFromCompany(
        userEntityList[0],
      );

      expect(result).toEqual(payableEntityListMock);
    });
  });

  describe('listPaidBalanceFromCompany method', () => {
    test('SUCCESS on list balance from company', async () => {
      const result = await payableController.listPaidBalanceFromCompany(
        userEntityList[2],
      );

      expect(result).toEqual({
        balance: { available: 0, waiting_funds: 12696.19 },
      });
    });
  });
});

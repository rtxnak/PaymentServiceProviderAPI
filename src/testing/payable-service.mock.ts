import { PayableService } from '../payable/payable.service';
import { payableEntityListMock } from './payable-entity-list.mock';

export const PayableServiceMock = {
  provide: PayableService,
  useValue: {
    createNewPayable: jest.fn().mockResolvedValue(payableEntityListMock[0]),
    listAllPayableDetailsFromCompany: jest
      .fn()
      .mockResolvedValue(payableEntityListMock),
    listBalanceFromCompany: jest.fn().mockResolvedValue({
      balance: { available: 0, waiting_funds: 12696.19 },
    }),
  },
};

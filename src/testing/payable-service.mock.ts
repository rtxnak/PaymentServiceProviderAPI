import { PayableService } from '../payable/payable.service';
import { payableEntityListMock } from './payable-entity-list.mock';

export const PayableServiceMock = {
  provide: PayableService,
  useValue: {
    createNewPayable: jest.fn().mockResolvedValue(payableEntityListMock[0]),
  },
};

import { PayableEntity } from '../payable/entity/payable.entity';

export const payableEntityListMock: PayableEntity[] = [
  {
    id: 1,
    paymentDate: new Date('2023-07-26 17:43:23'),
    feeValue: 328.33,
    payableAmount: 6238.22,
    transactionId: 1,
  },
  {
    id: 2,
    paymentDate: new Date('2023-07-26 17:43:23'),
    feeValue: 328.33,
    payableAmount: 6238.22,
    transactionId: 2,
  },
  {
    id: 3,
    paymentDate: new Date('2023-07-26 17:43:23'),
    feeValue: 197.0,
    payableAmount: 6369.55,
    transactionId: 3,
  },
];

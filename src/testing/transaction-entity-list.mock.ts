import { PaymentMethod } from '../enums/paymentMethod.enum';
import { TransactionEntity } from '../transaction/entity/transaction.entity';

export const transactionEntityListMock: TransactionEntity[] = [
  {
    id: 1,
    amount: 6566.55,
    description: 'something XYZ',
    cardNumber: '4223',
    cardOwnerName: 'john',
    cardExpirationDate: '02/2024',
    cardVerificationCode: '846',
    customerId: 1,
    companyId: 3,
    paymentMethod: PaymentMethod.creditCard,
    createdAt: new Date('2023-06-26 17:43:23.375755'),
  },
  {
    id: 2,
    amount: 6566.55,
    description: 'something XYZ',
    cardNumber: '4223',
    cardOwnerName: 'john',
    cardExpirationDate: '02/2024',
    cardVerificationCode: '846',
    customerId: 1,
    companyId: 3,
    paymentMethod: PaymentMethod.creditCard,
    createdAt: new Date('2023-06-26 17:43:23.375755'),
  },
  {
    id: 3,
    amount: 226.55,
    description: 'something XYZ',
    cardNumber: '4223',
    cardOwnerName: 'john',
    cardExpirationDate: '02/2024',
    cardVerificationCode: '846',
    customerId: 1,
    companyId: 3,
    paymentMethod: PaymentMethod.debitCard,
    createdAt: new Date('2023-06-26 17:43:23.375755'),
  },
];

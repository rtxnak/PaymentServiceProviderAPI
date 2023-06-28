import { NewTransactionDTO } from '../transaction/dto/new-transaction.dto';

export const NewTransactionDTOMock: NewTransactionDTO = {
  amount: 6566.55,
  description: 'something XYZ',
  paymentMethod: 'credit_card',
  cardNumber: '4564544664223',
  cardOwnerName: 'john',
  cardExpirationDate: '02/2024',
  cardVerificationCode: '846',
  companyId: 3,
};

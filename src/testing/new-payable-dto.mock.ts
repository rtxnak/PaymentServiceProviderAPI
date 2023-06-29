import { PaymentMethod } from '../enums/paymentMethod.enum';
import { NewPayableDTO } from '../payable/dto/new-payable.dto';

export const NewPayableDTOmock: NewPayableDTO = {
  transactionId: 1,
  amount: 6566.55,
  paymentMethod: PaymentMethod.creditCard,
  createdAt: new Date('2023-06-26 17:43:23.375755'),
};

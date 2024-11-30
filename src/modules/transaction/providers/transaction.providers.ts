import { TRANSACTION_REPOSITORY } from 'src/domain/common/constants';
import { Transaction } from 'src/domain/entities';
import {
  ITransactionRepository,
  TransactionRepository,
} from 'src/domain/repositories/transaction';

export const TransactionProviders = [
  {
    provide: TRANSACTION_REPOSITORY,
    useValue: Transaction,
  },
  {
    provide: ITransactionRepository,
    useClass: TransactionRepository,
  },
];

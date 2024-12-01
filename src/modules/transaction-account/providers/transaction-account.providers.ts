import { TRANSACTION_ACCOUNT_REPOSITORY } from 'src/domain/common/constants';
import { TransactionAccount } from 'src/domain/entities';
import { ITransactionAccountRepository } from 'src/domain/repositories/transaction-account/itransaction-account.repository';
import { TransactionAccountRepository } from 'src/domain/repositories/transaction-account/transaction-account.repository';

export const TransactionAccountProviders = [
  {
    provide: TRANSACTION_ACCOUNT_REPOSITORY,
    useValue: TransactionAccount,
  },
  {
    provide: ITransactionAccountRepository,
    useClass: TransactionAccountRepository,
  },
];

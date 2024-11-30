import { ACCOUNT_REPOSITORY } from 'src/domain/common/constants';
import { Account } from 'src/domain/entities';
import {
  AccountRepository,
  IAccountRepository,
} from 'src/domain/repositories/account';

export const AccountProviders = [
  {
    provide: ACCOUNT_REPOSITORY,
    useValue: Account,
  },
  {
    provide: IAccountRepository,
    useClass: AccountRepository,
  },
];

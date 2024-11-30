import { Module } from '@nestjs/common';
import { CustomerModule } from '../customer/customer.module';
import { AccountController } from './controllers/account.controller';
import { AccountProviders } from './providers/account.providers';
import { AccountCreateUseCase } from './use-cases/create/account-create.use-case';
import { AccountFindByAccountNumberUseCase } from './use-cases/find-by-account-number/account-find-by-account-number.use-case';
import { AccountFindOneUseCase } from './use-cases/find-one/account-find-one.use-case';
import { AccountUpdateAccountBalanceUseCase } from './use-cases/update-account-balance/account-update-account-balance.use-case';
import { AccountUpdateAccountStatusUseCase } from './use-cases/update-account-status/account-update-account-status.use-case';

@Module({
  imports: [CustomerModule],
  controllers: [AccountController],
  providers: [
    AccountCreateUseCase,
    AccountFindOneUseCase,
    AccountFindByAccountNumberUseCase,
    AccountUpdateAccountStatusUseCase,
    AccountUpdateAccountBalanceUseCase,
    ...AccountProviders,
  ],
  exports: [
    AccountCreateUseCase,
    AccountFindOneUseCase,
    AccountFindByAccountNumberUseCase,
    AccountUpdateAccountStatusUseCase,
    AccountUpdateAccountBalanceUseCase,
  ],
})
export class AccountModule {}

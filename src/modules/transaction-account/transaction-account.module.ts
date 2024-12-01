import { Module } from '@nestjs/common';
import { TransactionAccountProviders } from './providers/transaction-account.providers';
import { TransactionAccountCreateAccountsRegisterUseCase } from './use-cases/create-transaction-accounts-register/create-accounts-register.use-case';

@Module({
  providers: [
    ...TransactionAccountProviders,
    TransactionAccountCreateAccountsRegisterUseCase,
  ],
  exports: [TransactionAccountCreateAccountsRegisterUseCase],
})
export class TransactionAccountModule {}

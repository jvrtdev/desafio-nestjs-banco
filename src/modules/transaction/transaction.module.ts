import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { TransactionAccountModule } from '../transaction-account/transaction-account.module';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionProviders } from './providers/transaction.providers';
import { TransactionMakeDepositUseCase } from './use-cases/make-deposit/transaction-make-deposit.use-case';
import { TransactionMakeTransferUseCase } from './use-cases/make-transfer/transaction-make-transfer.use-case';
import { TransactionMakeWithdrawlUseCase } from './use-cases/make-withdrawl/transaction-make-withdrawl.use-case';

@Module({
  imports: [AccountModule, TransactionAccountModule],
  controllers: [TransactionController],
  providers: [
    TransactionMakeDepositUseCase,
    TransactionMakeTransferUseCase,
    TransactionMakeWithdrawlUseCase,
    ...TransactionProviders,
  ],
  exports: [
    TransactionMakeDepositUseCase,
    TransactionMakeTransferUseCase,
    TransactionMakeWithdrawlUseCase,
  ],
})
export class TransactionModule {}

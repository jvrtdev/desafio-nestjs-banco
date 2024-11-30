import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module';
import { AccountModule } from './modules/account/account.module';
import { CustomerModule } from './modules/customer/customer.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [DatabaseModule, CustomerModule, AccountModule, TransactionModule],
})
export class AppModule {}

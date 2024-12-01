import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './infrastructure/database/database.module';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { CustomerModule } from './modules/customer/customer.module';
import { TransactionAccountModule } from './modules/transaction-account/transaction-account.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    CustomerModule,
    AccountModule,
    TransactionModule,
    TransactionAccountModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}

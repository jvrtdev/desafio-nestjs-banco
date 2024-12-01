import { Inject, Injectable } from '@nestjs/common';
import { TRANSACTION_ACCOUNT_REPOSITORY } from 'src/domain/common/constants';
import { CreateTransactionAccountDto } from 'src/domain/dtos';
import { TransactionAccount } from 'src/domain/entities';

@Injectable()
export abstract class ITransactionAccountRepository {
  constructor(
    @Inject(TRANSACTION_ACCOUNT_REPOSITORY)
    protected readonly transactionAccountRepository: typeof TransactionAccount,
  ) {}
  abstract createAccountsInvolved(
    dto: CreateTransactionAccountDto,
  ): Promise<TransactionAccount>;
}

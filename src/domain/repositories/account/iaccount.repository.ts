import { Inject, Injectable } from '@nestjs/common';
import { ACCOUNT_REPOSITORY } from 'src/domain/common/constants';
import { ACCOUNT_STATUS } from 'src/domain/common/enums/account';
import { CreateAccountDto } from 'src/domain/dtos';
import { Account } from 'src/domain/entities';

@Injectable()
export abstract class IAccountRepository {
  constructor(
    @Inject(ACCOUNT_REPOSITORY)
    protected readonly accountRepository: typeof Account,
  ) {}

  abstract create(dto: CreateAccountDto): Promise<Account>;
  abstract findByAccountNumber(accountNumber: string): Promise<Account>;
  abstract findAccountInfoWithTransactions(accountId: string): Promise<Account>;
  abstract updateAccountStatus(
    accountId: string,
    status: ACCOUNT_STATUS,
  ): Promise<Account>;
  abstract updateAccountBalance(dto: {
    accountId: string;
    balance: number;
  }): Promise<Account>;
}

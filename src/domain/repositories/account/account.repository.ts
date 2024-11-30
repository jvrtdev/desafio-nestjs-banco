import { Injectable } from '@nestjs/common';
import { ACCOUNT_STATUS } from 'src/domain/common/enums/account';
import { CreateAccountDto } from 'src/domain/dtos/account/create-account.dto';
import { Account } from 'src/domain/entities';
import { IAccountRepository } from './iaccount.repository';

@Injectable()
export class AccountRepository extends IAccountRepository {
  create(dto: Partial<CreateAccountDto>): Promise<Account> {
    return this.accountRepository.create(dto);
  }
  findByAccountNumber(accountNumber: string): Promise<Account> {
    return this.accountRepository.findOne({ where: { accountNumber } });
  }
  findAccountInfoWithTransactions(accountId: string): Promise<Account> {
    return this.accountRepository.findByPk(accountId, {
      include: [
        { association: 'outgoingTransactions' },
        { association: 'incomingTransactions' },
      ],
    });
  }
  updateAccountStatus(
    accountId: string,
    status: ACCOUNT_STATUS,
  ): Promise<Account> {
    this.accountRepository.update(
      { status: status },
      { where: { id: accountId } },
    );
    return this.accountRepository.findByPk(accountId);
  }

  updateAccountBalance(dto: {
    accountId: string;
    balance: number;
  }): Promise<Account> {
    this.accountRepository.update(
      {
        balance: dto.balance,
      },
      {
        where: { id: dto.accountId },
      },
    );
    return this.accountRepository.findByPk(dto.accountId, {
      attributes: {
        include: ['id', 'balance', 'accountNumber', 'status'],
      },
    });
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/common/base/use-case';
import { ACCOUNT_STATUS } from 'src/domain/common/enums/account';
import { Account } from 'src/domain/entities';
import { IAccountRepository } from 'src/domain/repositories/account';

@Injectable()
export class AccountUpdateAccountStatusUseCase
  implements IBaseUseCase<string, HttpException>
{
  constructor(private readonly accountRepository: IAccountRepository) {}

  async execute(accountId: string): Promise<HttpException> {
    const account =
      await this.accountRepository.findAccountInfoWithTransactions(accountId);

    if (!account)
      throw new HttpException('Account not found', HttpStatus.BAD_REQUEST);

    if (account.status === ACCOUNT_STATUS.ACTIVE) {
      await this.accountRepository.updateAccountStatus(
        accountId,
        ACCOUNT_STATUS.INACTIVE,
      );
      throw new HttpException(
        'Account status updated to status: inactive',
        HttpStatus.OK,
      );
    }
    await this.accountRepository.updateAccountStatus(
      accountId,
      ACCOUNT_STATUS.ACTIVE,
    );
    throw new HttpException(
      'Account status updated to status: active',
      HttpStatus.OK,
    );
  }
}

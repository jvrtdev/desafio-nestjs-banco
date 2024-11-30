import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/common/base/use-case';
import { ACCOUNT_STATUS } from 'src/domain/common/enums/account';
import { CreateAccountDto } from 'src/domain/dtos';
import { Account } from 'src/domain/entities';
import { IAccountRepository } from 'src/domain/repositories/account';

@Injectable()
export class AccountUpdateAccountBalanceUseCase
  implements IBaseUseCase<{ accountId: string; balance: number }, Account>
{
  constructor(private readonly accountRepository: IAccountRepository) {}

  async execute(dto: { accountId: string; balance: number }) {
    const account = await this.accountRepository.updateAccountBalance(dto);

    if (!account)
      throw new HttpException('Account not found', HttpStatus.BAD_REQUEST);

    return account;
  }
}

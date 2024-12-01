import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/common/base/use-case';
import { Account } from 'src/domain/entities';
import { IAccountRepository } from 'src/domain/repositories/account';

@Injectable()
export class AccountFindByAccountNumberUseCase
  implements IBaseUseCase<string, Account>
{
  constructor(private readonly accountRepository: IAccountRepository) {}

  execute(accountNumber: string): Promise<Account> {
    const account = this.accountRepository.findByAccountNumber(accountNumber);

    if (!account)
      throw new HttpException('Account not found', HttpStatus.BAD_REQUEST);

    return account;
  }
}

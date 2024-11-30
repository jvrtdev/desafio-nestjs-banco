import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/common/base/use-case';
import { CreateAccountDto } from 'src/domain/dtos';
import { Account } from 'src/domain/entities';
import { IAccountRepository } from 'src/domain/repositories/account';

@Injectable()
export class AccountFindOneUseCase implements IBaseUseCase<string, Account> {
  constructor(private readonly accountRepository: IAccountRepository) {}

  async execute(accountId: string) {
    const account =
      await this.accountRepository.findAccountInfoWithTransactions(accountId);

    if (!account)
      throw new HttpException('Account not found', HttpStatus.BAD_REQUEST);

    return account;
  }
}

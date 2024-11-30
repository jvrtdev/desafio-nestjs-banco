import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/common/base/use-case';
import { ACCOUNT_STATUS } from 'src/domain/common/enums/account';
import { calculateNewBalanceByTransactionType } from 'src/domain/common/utils/account/calculateNewBalanceByTransactionType';
import { CreateTransactionDto } from 'src/domain/dtos';
import { CreateDepositDto } from 'src/domain/dtos/transaction/create-deposit.dto';
import { Transaction } from 'src/domain/entities';
import { ITransactionRepository } from 'src/domain/repositories/transaction';
import { AccountFindOneUseCase } from 'src/modules/account/use-cases/find-one/account-find-one.use-case';
import { AccountUpdateAccountBalanceUseCase } from 'src/modules/account/use-cases/update-account-balance/account-update-account-balance.use-case';

@Injectable()
export class TransactionMakeDepositUseCase
  implements IBaseUseCase<CreateDepositDto, Transaction>
{
  constructor(
    private readonly transactionRepository: ITransactionRepository,
    private readonly accountFindOneUseCase: AccountFindOneUseCase,
    private readonly accountUpdateAccountBalanceUpdateUseCase: AccountUpdateAccountBalanceUseCase,
  ) {}
  async execute(dto: CreateDepositDto): Promise<Transaction> {
    const account = await this.accountFindOneUseCase.execute(dto.accountId);
    console.log('valor inicial da balance do amigo', account.balance);

    dto.balance = calculateNewBalanceByTransactionType(
      account.balance,
      dto.amount,
      dto.type,
    );
    console.log('dto balance', dto.balance);

    await this.accountUpdateAccountBalanceUpdateUseCase.execute(dto);

    console.log('dto do amigo antes de transaction', dto);

    const transaction = await this.transactionRepository.createOperation(dto);

    return transaction;
  }
}

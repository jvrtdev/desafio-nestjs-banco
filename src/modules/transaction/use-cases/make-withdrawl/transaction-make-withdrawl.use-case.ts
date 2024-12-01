import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/common/base/use-case';
import { calculateNewBalanceByTransactionType } from 'src/domain/common/utils/account/calculateNewBalanceByTransactionType';
import { CreateWithdrawlDto } from 'src/domain/dtos';
import { Transaction } from 'src/domain/entities';
import { ITransactionRepository } from 'src/domain/repositories/transaction';
import { AccountFindOneUseCase } from 'src/modules/account/use-cases/find-one/account-find-one.use-case';
import { TransactionAccountCreateAccountsRegisterUseCase } from 'src/modules/transaction-account/use-cases/create-transaction-accounts-register/create-accounts-register.use-case';

@Injectable()
export class TransactionMakeWithdrawlUseCase
  implements IBaseUseCase<CreateWithdrawlDto, Transaction>
{
  constructor(
    private readonly transactionRepository: ITransactionRepository,
    private readonly accountFindOneUseCase: AccountFindOneUseCase,
    private readonly transactionAccountCreateAccountsRegisterUseCase: TransactionAccountCreateAccountsRegisterUseCase,
  ) {}
  async execute(dto: CreateWithdrawlDto): Promise<Transaction> {
    const account = await this.accountFindOneUseCase.execute(dto.accountId);

    account.balance = calculateNewBalanceByTransactionType(
      +account.balance,
      dto.amount,
      dto.type,
    );

    const transaction = await this.transactionRepository.createOperation(dto);

    await this.transactionAccountCreateAccountsRegisterUseCase.execute({
      originAccountId: null,
      destinationAccountId: dto.accountId,
      transactionId: transaction.id,
      type: dto.type,
    });

    return transaction;
  }
}

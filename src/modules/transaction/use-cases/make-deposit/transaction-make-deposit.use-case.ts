import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/common/base/use-case';
import { calculateNewBalanceByTransactionType } from 'src/domain/common/utils/account/calculateNewBalanceByTransactionType';
import { CreateDepositDto } from 'src/domain/dtos/transaction/create-deposit.dto';
import { Transaction, TransactionAccount } from 'src/domain/entities';
import { ITransactionRepository } from 'src/domain/repositories/transaction';
import { AccountFindOneUseCase } from 'src/modules/account/use-cases/find-one/account-find-one.use-case';
import { AccountUpdateAccountBalanceUseCase } from 'src/modules/account/use-cases/update-account-balance/account-update-account-balance.use-case';
import { TransactionAccountCreateAccountsRegisterUseCase } from 'src/modules/transaction-account/use-cases/create-transaction-accounts-register/create-accounts-register.use-case';

@Injectable()
export class TransactionMakeDepositUseCase
  implements IBaseUseCase<CreateDepositDto, Transaction>
{
  constructor(
    private readonly transactionRepository: ITransactionRepository,
    private readonly accountFindOneUseCase: AccountFindOneUseCase,
    private readonly accountUpdateAccountBalanceUpdateUseCase: AccountUpdateAccountBalanceUseCase,
    private readonly transactionAccountCreateAccountsRegisterUseCase: TransactionAccountCreateAccountsRegisterUseCase,
  ) {}
  async execute(dto: CreateDepositDto): Promise<Transaction> {
    const account = await this.accountFindOneUseCase.execute(dto.accountId);

    account.balance = calculateNewBalanceByTransactionType(
      +account.balance,
      dto.amount,
      dto.type,
    );

    await this.accountUpdateAccountBalanceUpdateUseCase.execute({
      accountId: account.id,
      balance: account.balance,
    });

    const transaction = await this.transactionRepository.createOperation(dto);

    await this.transactionAccountCreateAccountsRegisterUseCase.execute({
      originAccountId: dto.accountId,
      destinationAccountId: null,
      transactionId: transaction.id,
      type: dto.type,
    });

    return transaction;
  }
}

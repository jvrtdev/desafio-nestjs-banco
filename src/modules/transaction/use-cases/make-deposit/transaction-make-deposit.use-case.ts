import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/common/base/use-case';
import { CreateDepositDto } from 'src/domain/dtos/transaction/create-deposit.dto';
import { Transaction, TransactionAccount } from 'src/domain/entities';
import { ITransactionRepository } from 'src/domain/repositories/transaction';
import { TransactionService } from 'src/domain/services/transaction/transaction.service';
import { AccountFindOneUseCase } from 'src/modules/account/use-cases/find-one/account-find-one.use-case';
import { AccountUpdateAccountBalanceUseCase } from 'src/modules/account/use-cases/update-account-balance/account-update-account-balance.use-case';
import { LogCreateUseCase } from 'src/modules/log/use-cases/create/log-create.use-case';
import { TransactionAccountCreateAccountsRegisterUseCase } from 'src/modules/transaction-account/use-cases/create-transaction-accounts-register/create-accounts-register.use-case';

@Injectable()
export class TransactionMakeDepositUseCase
  implements IBaseUseCase<CreateDepositDto, Transaction>
{
  constructor(
    private readonly transactionRepository: ITransactionRepository,
    private readonly transactionService: TransactionService,
    private readonly accountFindOneUseCase: AccountFindOneUseCase,
    private readonly accountUpdateAccountBalanceUpdateUseCase: AccountUpdateAccountBalanceUseCase,
    private readonly transactionAccountCreateAccountsRegisterUseCase: TransactionAccountCreateAccountsRegisterUseCase,
    private readonly createLogUseCase: LogCreateUseCase,
  ) {}
  async execute(dto: CreateDepositDto): Promise<Transaction> {
    const account = await this.accountFindOneUseCase.execute(dto.accountId);

    dto.balance = this.transactionService.calculateNewBalanceByTransactionType(
      +account.balance,
      dto.amount,
      dto.type,
    );

    await this.accountUpdateAccountBalanceUpdateUseCase.execute({
      accountId: account.id,
      balance: dto.balance,
    });

    const transaction = await this.transactionRepository.createOperation(dto);

    const transactionAccount =
      await this.transactionAccountCreateAccountsRegisterUseCase.execute({
        originAccountId: null,
        destinationAccountId: dto.accountId,
        transactionId: transaction.id,
        type: dto.type,
      });

    await this.createLogUseCase.execute({
      amount: dto.amount,
      operation: dto.type,
      previousBalance: account.balance,
      newBalance: dto.balance,
      transactionAccountId: transactionAccount.id,
    });

    return transaction;
  }
}

import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/common/base/use-case';
import { TRANSACTION_TYPE } from 'src/domain/common/enums/transaction';
import { CreateTransferDto } from 'src/domain/dtos';
import { Transaction } from 'src/domain/entities';
import { ITransactionRepository } from 'src/domain/repositories/transaction';
import { TransactionService } from 'src/domain/services/transaction/transaction.service';
import { AccountUpdateAccountBalanceUseCase } from 'src/modules/account/use-cases/update-account-balance/account-update-account-balance.use-case';
import { LogCreateUseCase } from 'src/modules/log/use-cases/create/log-create.use-case';
import { TransactionAccountCreateAccountsRegisterUseCase } from 'src/modules/transaction-account/use-cases/create-transaction-accounts-register/create-accounts-register.use-case';

@Injectable()
export class TransactionMakeTransferUseCase
  implements IBaseUseCase<CreateTransferDto, Transaction>
{
  constructor(
    private readonly transactionRepository: ITransactionRepository,
    private readonly transactionService: TransactionService,
    private readonly accountUpdateAccountBalanceUpdateUseCase: AccountUpdateAccountBalanceUseCase,
    private readonly transactionAccountCreateAccountsRegisterUseCase: TransactionAccountCreateAccountsRegisterUseCase,
    private readonly createLogUseCase: LogCreateUseCase,
  ) {}
  async execute(dto: CreateTransferDto): Promise<Transaction> {
    const accounts =
      await this.transactionService.validateAccountAndAmountTransfer(
        dto.originAccountId,
        dto.destinationAccountId,
        dto.amount,
      );

    await Promise.all([
      this.accountUpdateAccountBalanceUpdateUseCase.execute({
        accountId: accounts.originAccount.id,
        balance: this.transactionService.calculateNewBalanceByTransactionType(
          +accounts.originAccount.balance,
          dto.amount,
          TRANSACTION_TYPE.TRANSFER,
        ),
      }),

      this.accountUpdateAccountBalanceUpdateUseCase.execute({
        accountId: accounts.destinationAccount.id,
        balance: this.transactionService.calculateNewBalanceByTransactionType(
          +accounts.destinationAccount.balance,
          dto.amount,
          TRANSACTION_TYPE.DEPOSIT,
        ),
      }),
    ]);

    const transaction = await this.transactionRepository.createOperation(dto);

    const transactionAccount =
      await this.transactionAccountCreateAccountsRegisterUseCase.execute({
        originAccountId: accounts.originAccount.id,
        destinationAccountId: accounts.destinationAccount.id,
        transactionId: transaction.id,
        type: dto.type,
      });

    await this.createLogUseCase.execute({
      amount: dto.amount,
      operation: dto.type,
      previousBalance: accounts.originAccount.balance,
      newBalance: accounts.originAccount.balance - dto.amount,
      transactionAccountId: transactionAccount.id,
    });

    return transaction;
  }
}

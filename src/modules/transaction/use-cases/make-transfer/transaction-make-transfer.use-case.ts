import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/common/base/use-case';
import { ACCOUNT_STATUS } from 'src/domain/common/enums/account';
import { TRANSACTION_TYPE } from 'src/domain/common/enums/transaction';
import { calculateNewBalanceByTransactionType } from 'src/domain/common/utils/account/calculateNewBalanceByTransactionType';
import { CreateTransactionDto, CreateTransferDto } from 'src/domain/dtos';
import { Transaction } from 'src/domain/entities';
import { ITransactionRepository } from 'src/domain/repositories/transaction';
import { AccountFindOneUseCase } from 'src/modules/account/use-cases/find-one/account-find-one.use-case';
import { AccountUpdateAccountBalanceUseCase } from 'src/modules/account/use-cases/update-account-balance/account-update-account-balance.use-case';
import { TransactionAccountCreateAccountsRegisterUseCase } from 'src/modules/transaction-account/use-cases/create-transaction-accounts-register/create-accounts-register.use-case';

@Injectable()
export class TransactionMakeTransferUseCase
  implements IBaseUseCase<CreateTransferDto, Transaction>
{
  constructor(
    private readonly transactionRepository: ITransactionRepository,
    private readonly accountFindOneUseCase: AccountFindOneUseCase,
    private readonly accountUpdateAccountBalanceUpdateUseCase: AccountUpdateAccountBalanceUseCase,
    private readonly transactionAccountCreateAccountsRegisterUseCase: TransactionAccountCreateAccountsRegisterUseCase,
  ) {}
  async execute(dto: CreateTransferDto): Promise<Transaction> {
    const originAccount = await this.accountFindOneUseCase.execute(
      dto.originAccountId,
    );

    const destinationAccount = await this.accountFindOneUseCase.execute(
      dto.destinationAccountId,
    );

    if (!originAccount || !destinationAccount)
      throw new HttpException(
        'Origin account or destination account not found',
        HttpStatus.BAD_REQUEST,
      );

    if (dto.amount <= 0)
      throw new HttpException('Invalid value!', HttpStatus.BAD_REQUEST);

    if (originAccount.status === ACCOUNT_STATUS.INACTIVE)
      throw new HttpException(
        'Account is inactive, cannot transfer',
        HttpStatus.BAD_REQUEST,
      );

    await Promise.all([
      this.accountUpdateAccountBalanceUpdateUseCase.execute({
        accountId: originAccount.id,
        balance: calculateNewBalanceByTransactionType(
          +originAccount.balance,
          dto.amount,
          TRANSACTION_TYPE.TRANSFER,
        ),
      }),

      this.accountUpdateAccountBalanceUpdateUseCase.execute({
        accountId: destinationAccount.id,
        balance: calculateNewBalanceByTransactionType(
          +destinationAccount.balance,
          dto.amount,
          TRANSACTION_TYPE.DEPOSIT,
        ),
      }),
    ]);

    const transaction = await this.transactionRepository.createOperation(dto);

    await this.transactionAccountCreateAccountsRegisterUseCase.execute({
      originAccountId: originAccount.id,
      destinationAccountId: destinationAccount.id,
      transactionId: transaction.id,
      type: dto.type,
    });

    return transaction;
  }
}

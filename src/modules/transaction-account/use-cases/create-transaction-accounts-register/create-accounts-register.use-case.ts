import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/common/base/use-case';
import { TRANSACTION_TYPE } from 'src/domain/common/enums/transaction';
import { CreateTransactionAccountDto } from 'src/domain/dtos';
import { CreateDepositDto } from 'src/domain/dtos/transaction/create-deposit.dto';
import { TransactionAccount } from 'src/domain/entities';
import { ITransactionAccountRepository } from 'src/domain/repositories/transaction-account';

@Injectable()
export class TransactionAccountCreateAccountsRegisterUseCase
  implements IBaseUseCase<CreateTransactionAccountDto, TransactionAccount>
{
  constructor(
    private readonly transactionAccountRepository: ITransactionAccountRepository,
  ) {}
  async execute(dto: CreateTransactionAccountDto): Promise<TransactionAccount> {
    console.log('dto do transactionAccountCreateAccountsRegisterUseCase', dto);
    if (!dto.type)
      throw new HttpException('Type not found', HttpStatus.BAD_REQUEST);

    switch (dto.type) {
      case TRANSACTION_TYPE.DEPOSIT:
        const depositAccounts = {
          originAccountId: null,
          destinationAccountId: dto.originAccountId,
          transactionId: dto.transactionId,
        };
        return await this.transactionAccountRepository.createAccountsInvolved(
          depositAccounts,
        );

      case TRANSACTION_TYPE.WITHDRAWL:
        const withdrawAccounts = {
          originAccountId: dto.originAccountId,
          destinationAccountId: null,
          transactionId: dto.transactionId,
        };
        return await this.transactionAccountRepository.createAccountsInvolved(
          withdrawAccounts,
        );

      case TRANSACTION_TYPE.TRANSFER:
        const transferAccounts = {
          originAccountId: dto.originAccountId,
          destinationAccountId: dto.destinationAccountId,
          transactionId: dto.transactionId,
        };
        return await this.transactionAccountRepository.createAccountsInvolved(
          transferAccounts,
        );
    }
  }
}

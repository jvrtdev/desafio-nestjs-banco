import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/common/base/use-case';
import { TRANSACTION_TYPE } from 'src/domain/common/enums/transaction';
import { CreateTransactionAccountDto } from 'src/domain/dtos';
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
    if (!dto.type)
      throw new HttpException('Type not found', HttpStatus.BAD_REQUEST);

    const accounts = {
      originAccountId:
        dto.type === TRANSACTION_TYPE.DEPOSIT ? null : dto.originAccountId,
      destinationAccountId:
        dto.type === TRANSACTION_TYPE.WITHDRAWL
          ? null
          : dto.destinationAccountId,
      transactionId: dto.transactionId,
    };

    switch (dto.type) {
      case TRANSACTION_TYPE.DEPOSIT:
        return await this.transactionAccountRepository.createAccountsInvolved(
          accounts,
        );

      case TRANSACTION_TYPE.WITHDRAWL:
        return await this.transactionAccountRepository.createAccountsInvolved(
          accounts,
        );

      case TRANSACTION_TYPE.TRANSFER:
        return await this.transactionAccountRepository.createAccountsInvolved(
          accounts,
        );
    }
  }
}

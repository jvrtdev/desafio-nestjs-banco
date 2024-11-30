import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/common/base/use-case';
import { CreateTransactionDto } from 'src/domain/dtos';
import { Transaction } from 'src/domain/entities';
import { ITransactionRepository } from 'src/domain/repositories/transaction';

@Injectable()
export class TransactionMakeWithdrawlUseCase
  implements IBaseUseCase<CreateTransactionDto, Transaction>
{
  constructor(private readonly transactionRepository: ITransactionRepository) {}
  execute(dto: CreateTransactionDto): Promise<Transaction> {
    throw new Error('UseCase not implemented.');
  }
}

import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from 'src/domain/dtos';
import { Transaction } from 'src/domain/entities';
import { ITransactionRepository } from './itransaction.repository';

@Injectable()
export class TransactionRepository extends ITransactionRepository {
  createOperation(dto: CreateTransactionDto): Promise<Transaction> {
    return this.transactionRepository.create(dto);
  }
}

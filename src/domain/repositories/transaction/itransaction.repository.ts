import { Inject, Injectable } from '@nestjs/common';
import { TRANSACTION_REPOSITORY } from 'src/domain/common/constants';
import { Transaction } from 'src/domain/entities';

@Injectable()
export abstract class ITransactionRepository {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    protected readonly transactionRepository: typeof Transaction,
  ) {}

  abstract createOperation(dto: Partial<Transaction>): Promise<Transaction>;
}

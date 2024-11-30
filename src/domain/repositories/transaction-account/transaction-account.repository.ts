import { Injectable } from '@nestjs/common';
import { CreateTransactionAccountDto } from 'src/domain/dtos';
import { TransactionAccount } from 'src/domain/entities';
import { ITransactionAccountRepository } from './itransaction-account.repository';

@Injectable()
export class TransactionAccountRepository extends ITransactionAccountRepository {
  createAccountsInvolved(
    dto: Partial<TransactionAccount>,
  ): Promise<TransactionAccount> {
    return this.transactionAccountRepository.create(dto);
  }
}

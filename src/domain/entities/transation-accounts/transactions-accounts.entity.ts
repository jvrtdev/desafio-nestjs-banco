import { TransactionAccount } from '@prisma/client';

export class TransactionsAccountsEntity implements TransactionAccount {
  id: string;
  originAccountId: number;
  destinationAccountId: number;
  transactionId: string;
  createdAt: Date;
}

import { $Enums, Transaction } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class TransactionEntity implements Transaction {
  id: string;
  createdAt: Date;
  type: $Enums.TransactionsTypes;
  amount: Decimal;
}

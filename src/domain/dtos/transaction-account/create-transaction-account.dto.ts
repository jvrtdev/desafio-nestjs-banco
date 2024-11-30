import { IsNotEmpty, IsString } from 'class-validator';

import { Account, Transaction } from 'src/domain/entities';

export class CreateTransactionAccountDto {
  @IsNotEmpty()
  @IsString()
  originAccountId: string;

  @IsNotEmpty()
  @IsString()
  destinationAccountId: string;

  @IsNotEmpty()
  @IsString()
  transactionId: string;

  originAccount: Account;

  destinationAccount: Account;

  transaction: Transaction;
}

import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TRANSACTION_TYPE } from 'src/domain/common/enums/transaction';

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

  @IsOptional()
  @IsString()
  @IsEnum(TRANSACTION_TYPE)
  type?: TRANSACTION_TYPE;

  // originAccount: Account;

  // destinationAccount: Account;

  // transaction: Transaction;
}

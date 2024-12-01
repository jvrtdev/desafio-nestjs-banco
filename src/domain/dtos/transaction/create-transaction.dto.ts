import { IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TRANSACTION_TYPE } from 'src/domain/common/enums/transaction';

export class CreateTransactionDto {
  @IsDecimal()
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  @IsString()
  type: TRANSACTION_TYPE;

  @IsNotEmpty()
  @IsString()
  originAccountId: string;

  @IsNotEmpty()
  @IsString()
  destinationAccountId: string;
}

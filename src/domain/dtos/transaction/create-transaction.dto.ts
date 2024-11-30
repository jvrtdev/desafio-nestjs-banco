import { IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TRANSACTION_TYPE } from 'src/domain/common/enums/transaction';

export class CreateTransactionDto {
  @IsDecimal()
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  @IsString()
  type: TRANSACTION_TYPE;

  @IsOptional()
  @IsString()
  originAccountId?: string;

  @IsOptional()
  @IsString()
  destinationAccountId?: string;
}

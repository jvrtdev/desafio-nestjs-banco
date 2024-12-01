import { IsDecimal, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TRANSACTION_TYPE } from 'src/domain/common/enums/transaction';

export class CreateLogDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(TRANSACTION_TYPE)
  operation: string;

  @IsDecimal()
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  @IsDecimal()
  previousBalance: number;

  @IsNotEmpty()
  @IsDecimal()
  newBalance: number;

  @IsString()
  @IsNotEmpty()
  transactionAccountId: string;
}

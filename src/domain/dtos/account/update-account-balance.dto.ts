import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAccountBalanceDto {
  @IsString()
  @IsNotEmpty()
  accountId: string;

  @IsNumber()
  @IsNotEmpty()
  balance: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsOptional()
  @IsString()
  destinationAccountId?: string;
}

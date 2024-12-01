import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TRANSACTION_TYPE } from 'src/domain/common/enums/transaction';

export class CreateWithdrawlDto {
  @ApiProperty({
    description: 'Id of the account',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  @IsNotEmpty()
  @IsString()
  accountId: string;

  @ApiProperty({
    description: 'Amount',
    example: '400',
  })
  @IsNotEmpty()
  @IsDecimal()
  amount: number;

  @IsNotEmpty()
  @IsDecimal()
  balance: number;

  @ApiProperty({
    description: 'type of transaction',
    example: TRANSACTION_TYPE.WITHDRAWL,
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(TRANSACTION_TYPE)
  type: TRANSACTION_TYPE.WITHDRAWL;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TRANSACTION_TYPE } from 'src/domain/common/enums/transaction';

export class CreateTransferDto {
  @ApiProperty({
    description: 'Id of the origin account',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  @IsNotEmpty()
  @IsString()
  originAccountId: string;

  @ApiProperty({
    description: 'Id of the destination transfer account',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  @IsString()
  @IsNotEmpty()
  destinationAccountId: string;

  @ApiProperty({
    description: 'Amount',
    example: '100',
  })
  @IsNotEmpty()
  @IsDecimal()
  amount: number;

  @IsNotEmpty()
  @IsDecimal()
  balance: number;

  @ApiProperty({
    description: 'type of transaction',
    example: TRANSACTION_TYPE.TRANSFER,
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(TRANSACTION_TYPE)
  type: TRANSACTION_TYPE;
}

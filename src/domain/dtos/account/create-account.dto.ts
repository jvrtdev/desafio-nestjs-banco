import { ApiProperty } from '@nestjs/swagger';
import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ACCOUNT_STATUS } from 'src/domain/common/enums/account';

export class CreateAccountDto {
  @IsString()
  @IsOptional()
  accountId?: string;

  @IsNotEmpty()
  @IsNumber()
  accountNumber: number;

  @IsDecimal()
  @IsNotEmpty()
  balance: number;

  @ApiProperty({
    description: 'Id of the customer',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  @IsNotEmpty()
  @IsString()
  customerId: string;

  @ApiProperty({
    description: 'Status of the account',
    enum: ACCOUNT_STATUS,
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  status: ACCOUNT_STATUS.ACTIVE;
}

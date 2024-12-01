import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { createApiPropertyDecorator } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import {
  CreateTransactionDto,
  CreateTransferDto,
  CreateWithdrawlDto,
} from 'src/domain/dtos';
import { CreateDepositDto } from 'src/domain/dtos/transaction/create-deposit.dto';
import { Transaction } from 'src/domain/entities';
import { TransactionMakeDepositUseCase } from '../use-cases/make-deposit/transaction-make-deposit.use-case';
import { TransactionMakeTransferUseCase } from '../use-cases/make-transfer/transaction-make-transfer.use-case';
import { TransactionMakeWithdrawlUseCase } from '../use-cases/make-withdrawl/transaction-make-withdrawl.use-case';
import { ITransactionController } from './itransaction.controller';

@Controller('movimentacoes')
export class TransactionController
  implements ITransactionController<Transaction>
{
  constructor(
    private readonly transactionMakeDepositUseCase: TransactionMakeDepositUseCase,
    private readonly transactionTransferDepositUseCase: TransactionMakeTransferUseCase,
    private readonly transactionMakeWithdrawlUseCase: TransactionMakeWithdrawlUseCase,
  ) {}
  @Post('deposito')
  @ApiResponse({
    status: 201,
    description: 'The deposit has been successfully created.',
  })
  makeDesposit(@Body() dto: CreateDepositDto): Promise<Transaction> {
    return this.transactionMakeDepositUseCase.execute(dto);
  }
  @Post('transferencia')
  @ApiResponse({
    status: 201,
    description: 'The transfer has been successfully created.',
  })
  makeTransfer(@Body() dto: CreateTransferDto): Promise<Transaction> {
    return this.transactionTransferDepositUseCase.execute(dto);
  }

  @Post('saque')
  @ApiResponse({
    status: 201,
    description: 'The withdrawal has been successfully created.',
  })
  makeWithdrawal(@Body() dto: CreateWithdrawlDto): Promise<Transaction> {
    return this.transactionMakeWithdrawlUseCase.execute(dto);
  }
}

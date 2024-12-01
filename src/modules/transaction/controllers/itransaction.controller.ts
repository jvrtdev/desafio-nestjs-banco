import { CreateTransferDto, CreateWithdrawlDto } from 'src/domain/dtos';
import { CreateDepositDto } from 'src/domain/dtos/transaction/create-deposit.dto';

export interface ITransactionController<E> {
  makeDesposit(dto: CreateDepositDto): Promise<E>;
  makeWithdrawal(dto: CreateWithdrawlDto): Promise<E>;
  makeTransfer(dto: CreateTransferDto): Promise<E>;
}

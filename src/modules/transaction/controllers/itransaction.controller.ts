import { CreateDepositDto } from 'src/domain/dtos/transaction/create-deposit.dto';

export interface ITransactionController<T, E> {
  makeDesposit(dto: CreateDepositDto): Promise<E>;
  makeWithdrawal(dto: T): Promise<E>;
  makeTransfer(dto: T): Promise<E>;
}

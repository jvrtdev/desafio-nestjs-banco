import { HttpException } from '@nestjs/common';

export interface IAccountController<T, E> {
  create(dto: T): Promise<E>;
  updateAccountStatus(accountId: string): Promise<HttpException>;
  findAccountById(accountId: string): Promise<E>;
  findAccountByAccountNumber(accountNumber: string): Promise<E>;
}

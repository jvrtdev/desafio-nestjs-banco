import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ACCOUNT_STATUS } from 'src/domain/common/enums/account';
import { TRANSACTION_TYPE } from 'src/domain/common/enums/transaction';
import { AccountService } from '../account/account.service';

@Injectable()
export class TransactionService {
  constructor(private readonly accountService: AccountService) {}

  async validateAccountAndAmountTransfer(
    originAccountId: string,
    destinationAccountId: string,
    amount: number,
  ) {
    const accounts =
      await this.accountService.validateOriginAccountAndDestinationAccount(
        originAccountId,
        destinationAccountId,
      );

    if (amount <= 0)
      throw new HttpException('Invalid value!', HttpStatus.BAD_REQUEST);

    if (accounts.originAccount.status === ACCOUNT_STATUS.INACTIVE)
      throw new HttpException(
        'Account is inactive, cannot transfer',
        HttpStatus.BAD_REQUEST,
      );
    return accounts;
  }

  calculateNewBalanceByTransactionType(
    balance: number,
    amount: number,
    type: TRANSACTION_TYPE,
  ) {
    switch (type) {
      case TRANSACTION_TYPE.WITHDRAWL:
        if (balance === 0 || balance < amount)
          throw new HttpException('Insufficient funds', HttpStatus.BAD_REQUEST);

        return Number(balance - amount);

      case TRANSACTION_TYPE.TRANSFER:
        if (balance === 0 || balance < amount)
          throw new HttpException('Insufficient funds', HttpStatus.BAD_REQUEST);

        return Number(balance - amount);

      case TRANSACTION_TYPE.DEPOSIT:
        return Number(balance + amount);
    }
  }
}

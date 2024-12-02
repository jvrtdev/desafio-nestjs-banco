import { HttpException, HttpStatus } from '@nestjs/common';
import { TRANSACTION_TYPE } from 'src/domain/common/enums/transaction';

export function calculateNewBalanceByTransactionType(
  balance: number,
  amount: number,
  type: TRANSACTION_TYPE,
) {
  console.log('calculate: type:', type, 'amount:', amount, 'balance:', balance);
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

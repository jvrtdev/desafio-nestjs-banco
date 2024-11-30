import { TRANSACTION_TYPE } from '../../enums/transaction';

export function calculateNewBalanceByTransactionType(
  balance: number,
  amount: number,
  type: TRANSACTION_TYPE,
) {
  console.log('calculate: type:', type, 'amount:', amount, 'balance:', balance);
  switch (type) {
    case TRANSACTION_TYPE.WITHDRAW:
      return Number(balance - amount);

    case TRANSACTION_TYPE.TRANSFER:
      return Number(balance - amount);

    case TRANSACTION_TYPE.DEPOSIT:
      return Number(balance + amount);
  }
}

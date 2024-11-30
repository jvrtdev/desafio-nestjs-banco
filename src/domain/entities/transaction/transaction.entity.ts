import {
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

import { TRANSACTION_TYPE } from 'src/domain/common/enums/transaction';
import { Account } from '../account';
import { TransactionAccount } from '../transaction-account';

@Table({ tableName: 'transactions' })
export class Transaction extends Model<Transaction> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.ENUM(
      TRANSACTION_TYPE.DEPOSIT,
      TRANSACTION_TYPE.WITHDRAW,
      TRANSACTION_TYPE.TRANSFER,
    ),
    allowNull: false,
  })
  type: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  amount: number;

  //@HasMany(() => TransactionAccount)
  //transactionAccounts: TransactionAccount[];

  @BelongsToMany(() => Account, () => TransactionAccount, 'originAccountId')
  originAccounts: Account[];

  @BelongsToMany(
    () => Account,
    () => TransactionAccount,
    'destinationAccountId',
  )
  destinationAccounts: Account[];

  @CreatedAt
  @Column({
    type: DataType.DATE,
    field: 'created_at',
  })
  createdAt: Date;
}

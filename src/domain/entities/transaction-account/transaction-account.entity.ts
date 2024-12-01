import {
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Account } from '../account/account.entity';
import { Transaction } from '../transaction/transaction.entity';
@Table({ tableName: 'transations_account' })
export class TransactionAccount extends Model<TransactionAccount> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Account)
  @Column({
    type: DataType.UUID,
    allowNull: true,
    field: 'origin_account_id',
  })
  originAccountId: string;

  @ForeignKey(() => Account)
  @Column({
    type: DataType.UUID,
    allowNull: true,
    field: 'destination_account_id',
  })
  destinationAccountId: string;

  @ForeignKey(() => Transaction)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  transactionId: string;

  @BelongsTo(() => Account, 'origin_account_id')
  originAccount: Account;

  @BelongsTo(() => Account, 'destination_account_id')
  destinationAccount: Account;

  @BelongsTo(() => Transaction)
  transaction: Transaction;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    field: 'created_at',
  })
  createdAt: Date;
}

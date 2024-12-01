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
    unique: false,
  })
  originAccountId: string;

  @ForeignKey(() => Account)
  @Column({
    type: DataType.UUID,
    allowNull: true,
    field: 'destination_account_id',
    unique: false,
  })
  destinationAccountId: string;

  @ForeignKey(() => Transaction)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    unique: true,
  })
  transactionId: string;

  @BelongsTo(() => Account)
  originAccount: Account;

  @BelongsTo(() => Account)
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

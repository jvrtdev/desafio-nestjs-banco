import {
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ACCOUNT_STATUS } from 'src/domain/common/enums/account';
import { Customer } from '../customer/customer.entity';
import { Transaction } from '../transaction';
import { TransactionAccount } from '../transaction-account';

@Table({ tableName: 'accounts', timestamps: true, underscored: true })
export class Account extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    unique: true,
    field: 'account_number',
  })
  accountNumber: number;

  @Column({
    type: DataType.DECIMAL,
    defaultValue: 0,
  })
  balance: number;

  @Column({
    type: DataType.ENUM(ACCOUNT_STATUS.ACTIVE, ACCOUNT_STATUS.INACTIVE),
    defaultValue: ACCOUNT_STATUS.ACTIVE,
  })
  status: string;

  @ForeignKey(() => Customer)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'customer_id',
  })
  customerId: string;

  @BelongsTo(() => Customer)
  customer: Customer;

  @BelongsToMany(
    () => Transaction,
    () => TransactionAccount,
    'origin_account_id',
  )
  outgoingTransactions: Transaction[];

  @BelongsToMany(
    () => Transaction,
    () => TransactionAccount,
    'destination_account_id',
  )
  incomingTransactions: Transaction[];

  @CreatedAt
  @Column({
    type: DataType.DATE,
    field: 'created_at',
  })
  createdAt: Date;
}

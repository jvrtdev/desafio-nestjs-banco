// @Table({ tableName: 'logs' })
// export class Log extends Model<Log> {
//   @Column({
//     type: DataType.UUID,
//     defaultValue: DataType.UUIDV4,
//     primaryKey: true,
//   })
//   id: string;

//   @Column({
//     type: DataType.ENUM(
//       MODEL_NAME.ACCOUNT,
//       MODEL_NAME.CUSTOMER,
//       MODEL_NAME.TRANSACTION,
//       MODEL_NAME.TRANSACTION_ACCOUNTS,
//     ),
//     field: 'model_name',
//   })
//   modelName: string;

//   @Column({
//     type: DataType.INTEGER,
//     field: 'account_id',
//   })
//   accountId: number;

//   @Column({
//     type: DataType.UUID,
//     field: 'transation_id',
//   })
//   transactionId: string;

//   @Column({
//     type: DataType.ENUM(
//       LOG_ACTION.CREATE,
//       LOG_ACTION.DEPOSIT,
//       LOG_ACTION.WITHDRAW,
//       LOG_ACTION.TRANSFER,
//       LOG_ACTION.LOGGED,
//       LOG_ACTION.LOGOUT,
//     ),
//   })
//   action: string;

//   @Column({
//     type: DataType.STRING,
//   })
//   message: string;

//   @CreatedAt
//   @Column({
//     type: DataType.DATE,
//     field: 'created_at',
//   })
//   createdAt: Date;

//   @UpdatedAt
//   @Column({
//     type: DataType.DATE,
//     field: 'updated_at',
//   })
//   updatedAt: Date;
// }

import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { LOG_ACTION, MODEL_NAME } from 'src/domain/common/enums/log';
import { TRANSACTION_TYPE } from 'src/domain/common/enums/transaction';
import { Account } from '../account';
import { Transaction } from '../transaction';
import { TransactionAccount } from '../transaction-account';

@Table({ tableName: 'audit_logs', timestamps: true, underscored: true })
export class Log extends Model<Log> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.ENUM(
      TRANSACTION_TYPE.DEPOSIT,
      TRANSACTION_TYPE.WITHDRAWL,
      TRANSACTION_TYPE.TRANSFER,
    ),
    allowNull: false,
  })
  operation: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
    field: 'previous_balance',
  })
  previousBalance: number;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
    field: 'new_balance',
  })
  newBalance: number;

  @ForeignKey(() => TransactionAccount)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  transactionAccountId: string;

  @BelongsTo(() => TransactionAccount)
  transactionAccounts: TransactionAccount[];

  @CreatedAt
  @Column({
    type: DataType.DATE,
    field: 'created_at',
  })
  timestamp: Date;
}

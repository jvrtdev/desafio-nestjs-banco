import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { LOG_ACTION, MODEL_NAME } from 'src/domain/common/enums/log';

@Table({ tableName: 'logs' })
export class Log extends Model<Log> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.ENUM(
      MODEL_NAME.ACCOUNT,
      MODEL_NAME.CUSTOMER,
      MODEL_NAME.TRANSACTION,
      MODEL_NAME.TRANSACTION_ACCOUNTS,
    ),
    field: 'model_name',
  })
  modelName: string;

  @Column({
    type: DataType.INTEGER,
    field: 'account_id',
  })
  accountId: number;

  @Column({
    type: DataType.UUID,
    field: 'transation_id',
  })
  transactionId: string;

  @Column({
    type: DataType.ENUM(
      LOG_ACTION.CREATE,
      LOG_ACTION.DEPOSIT,
      LOG_ACTION.WITHDRAW,
      LOG_ACTION.TRANSFER,
      LOG_ACTION.LOGGED,
      LOG_ACTION.LOGOUT,
    ),
  })
  action: string;

  @Column({
    type: DataType.STRING,
  })
  message: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    field: 'created_at',
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    field: 'updated_at',
  })
  updatedAt: Date;
}

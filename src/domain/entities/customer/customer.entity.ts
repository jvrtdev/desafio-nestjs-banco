import {
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Account } from '../account';

@Table({ tableName: 'customers' })
export class Customer extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'full_name',
  })
  fullName: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  cpf: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'date_birth',
  })
  dateBirth: Date;

  @HasMany(() => Account)
  accounts: Account[];

  @CreatedAt
  @Column({
    type: DataType.DATE,
    field: 'created_at',
  })
  createdAt: Date;
}

import { Sequelize } from 'sequelize-typescript';
import { environment } from 'src/config';
import { Account } from 'src/domain/entities/account/account.entity';
import { Customer } from 'src/domain/entities/customer/customer.entity';
import { TransactionAccount } from 'src/domain/entities/transaction-account/transaction-account.entity';
import { Transaction } from 'src/domain/entities/transaction/transaction.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: environment.DATABASE_HOST,
        port: +environment.DATABASE_PORT,
        username: environment.DATABASE_USERNAME,
        password: environment.DATABASE_PASSWORD,
        database: environment.DATABASE_NAME,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      });
      sequelize.addModels([Customer, Account, Transaction, TransactionAccount]);
      await sequelize.sync();
      return sequelize;
    },
  },
];

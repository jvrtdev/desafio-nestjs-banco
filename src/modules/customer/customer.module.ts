import { Module } from '@nestjs/common';
import { CPFUtil } from 'src/domain/common/utils/cpf/cpf.util';
import {
  CustomerRepository,
  ICustomerRepository,
} from 'src/domain/repositories/customer';
import { CustomerController } from './controllers/customer.controller';
import { CustomerProviders } from './providers/customer.providers';
import { CustomerCreateUseCase } from './use-cases/create/customer-create.use-case';
import { CustomerFindOneUseCase } from './use-cases/find-one/customer-find-one.use-case';

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [
    CustomerCreateUseCase,
    CustomerFindOneUseCase,
    CPFUtil,
    ...CustomerProviders,
  ],
  exports: [CustomerCreateUseCase, CustomerFindOneUseCase],
})
export class CustomerModule {}

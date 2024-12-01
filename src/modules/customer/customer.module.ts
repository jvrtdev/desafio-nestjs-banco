import { Module } from '@nestjs/common';
import { CPFService } from 'src/domain/services/customer/cpf';
import { CustomerService } from 'src/domain/services/customer/validate-customer.service';
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
    CustomerService,
    CPFService,
    ...CustomerProviders,
  ],
  exports: [CustomerCreateUseCase, CustomerFindOneUseCase, CustomerService],
})
export class CustomerModule {}

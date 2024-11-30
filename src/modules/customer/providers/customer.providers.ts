import { CUSTOMER_REPOSITORY } from 'src/domain/common/constants';
import { Customer } from 'src/domain/entities';
import {
  CustomerRepository,
  ICustomerRepository,
} from 'src/domain/repositories/customer';

export const CustomerProviders = [
  {
    provide: CUSTOMER_REPOSITORY,
    useValue: Customer,
  },
  {
    provide: ICustomerRepository,
    useClass: CustomerRepository,
  },
];

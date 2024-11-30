import { Inject, Injectable } from '@nestjs/common';
import { CUSTOMER_REPOSITORY } from 'src/domain/common/constants';
import { CreateCustomerDto } from '../../dtos/customer/create-customer.dto';
import { Customer } from '../../entities';

@Injectable()
export abstract class ICustomerRepository {
  @Inject(CUSTOMER_REPOSITORY)
  protected readonly customerRepository: typeof Customer;
  constructor() {}
  abstract create(dto: CreateCustomerDto): Promise<Customer>;
  abstract findCustomerById(customerId: string): Promise<Customer>;
  abstract findByCpf(cpf: string): Promise<Customer>;
}

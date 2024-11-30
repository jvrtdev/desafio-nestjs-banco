import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/domain/dtos';
import { Account, Customer } from 'src/domain/entities';
import { ICustomerRepository } from './icustomer.repository';

@Injectable()
export class CustomerRepository extends ICustomerRepository {
  findCustomerById(customerId: string): Promise<Customer> {
    return this.customerRepository.findOne({
      where: { id: customerId },
      attributes: {
        exclude: ['password'],
      },
      include: [{ model: Account }],
    });
  }
  findByCpf(cpf: string): Promise<Customer> {
    return this.customerRepository.findOne({ where: { cpf } });
  }

  create(dto: Partial<CreateCustomerDto>): Promise<Customer> {
    return this.customerRepository.create(dto);
  }
}

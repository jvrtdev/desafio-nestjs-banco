import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/common/base/use-case';
import { CUSTOMER_REPOSITORY } from 'src/domain/common/constants';
import { CreateCustomerDto } from 'src/domain/dtos';
import { Customer } from 'src/domain/entities';
import { ICustomerRepository } from 'src/domain/repositories/customer';

@Injectable()
export class CustomerFindOneUseCase implements IBaseUseCase<string, Customer> {
  constructor(private readonly customerRepository: ICustomerRepository) {}
  async execute(accountId: string): Promise<Customer> {
    const customer = await this.customerRepository.findCustomerById(accountId);

    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST);
    }

    return customer;
  }
}
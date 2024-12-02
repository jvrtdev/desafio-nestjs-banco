import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/common/base/use-case';
import { Customer } from 'src/domain/entities';
import { ICustomerRepository } from 'src/domain/repositories/customer';

@Injectable()
export class CustomerFindByCpfUseCase
  implements IBaseUseCase<string, Customer>
{
  constructor(private readonly customerRepository: ICustomerRepository) {}
  async execute(cpf: string): Promise<Customer> {
    const customer = await this.customerRepository.findByCpf(cpf);

    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST);
    }

    return customer;
  }
}

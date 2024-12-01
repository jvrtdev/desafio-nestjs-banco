import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/common/base/use-case';
import { CreateCustomerDto } from 'src/domain/dtos/customer/create-customer.dto';
import { Customer } from 'src/domain/entities/customer/customer.entity';
import { ICustomerRepository } from 'src/domain/repositories/customer';
import { CustomerService } from 'src/domain/services/customer/validate-customer.service';

@Injectable()
export class CustomerCreateUseCase
  implements IBaseUseCase<CreateCustomerDto, Customer>
{
  constructor(
    private readonly customerRepository: ICustomerRepository,
    private readonly customerService: CustomerService,
  ) {}

  async execute(dto: CreateCustomerDto): Promise<Customer> {
    await this.customerService.ValidadeCustomer(dto);

    dto.password = await this.customerService.HashCustomerPassword(
      dto.password,
    );

    const customer = await this.customerRepository.create(dto);

    return customer;
  }
}

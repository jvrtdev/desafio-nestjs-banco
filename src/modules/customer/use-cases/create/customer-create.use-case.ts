import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/common/base/use-case';
import { CUSTOMER_REPOSITORY } from 'src/domain/common/constants';
import { hashUtil } from 'src/domain/common/utils/bcrypt/hash.util';
import { CPFUtil } from 'src/domain/common/utils/cpf/cpf.util';
import { CreateCustomerDto } from 'src/domain/dtos/customer/create-customer.dto';
import { Customer } from 'src/domain/entities/customer/customer.entity';
import { ICustomerRepository } from 'src/domain/repositories/customer';

@Injectable()
export class CustomerCreateUseCase
  implements IBaseUseCase<CreateCustomerDto, Customer>
{
  constructor(
    private readonly customerRepository: ICustomerRepository,
    private readonly cpfUtil: CPFUtil,
  ) {}

  async execute(dto: CreateCustomerDto): Promise<Customer> {
    const cpfIsValid = this.cpfUtil.isValid(dto.cpf);

    if (!cpfIsValid) {
      throw new HttpException('Invalid CPF', HttpStatus.BAD_REQUEST);
    }

    const documentAlredyExists = await this.customerRepository.findByCpf(
      dto.cpf,
    );

    if (documentAlredyExists)
      throw new HttpException(
        'Document already exists',
        HttpStatus.BAD_REQUEST,
      );

    dto.password = await hashUtil(dto.password);

    //const { dataValues } = new Customer(dto);
    const customer = await this.customerRepository.create(dto);

    return customer;
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hashUtil } from 'src/domain/common/utils/bcrypt';
import { CreateCustomerDto } from 'src/domain/dtos';
import { ICustomerRepository } from 'src/domain/repositories/customer';
import { CPFService } from './cpf';

@Injectable()
export class CustomerService {
  constructor(
    private readonly cpfService: CPFService,
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async ValidadeCustomer(dto: CreateCustomerDto) {
    const formatedCpf = this.cpfService.format(dto.cpf);

    const cpfIsValid = this.cpfService.isValid(formatedCpf);

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
  }
  async HashCustomerPassword(password: string) {
    return await hashUtil(password);
  }
}

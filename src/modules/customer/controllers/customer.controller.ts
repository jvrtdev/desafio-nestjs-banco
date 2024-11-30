import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateCustomerDto } from 'src/domain/dtos/customer/create-customer.dto';
import { Customer } from 'src/domain/entities';
import { CustomerCreateUseCase } from '../use-cases/create/customer-create.use-case';
import { CustomerFindOneUseCase } from '../use-cases/find-one/customer-find-one.use-case';
import { ICustomerController } from './interface-customer.controller';

@Controller('clientes')
export class CustomerController
  implements ICustomerController<Customer, CreateCustomerDto>
{
  constructor(
    private readonly customerCreateUseCase: CustomerCreateUseCase,
    private readonly customerFindOneUseCase: CustomerFindOneUseCase,
  ) {}
  @Post()
  @ApiResponse({ status: 201, description: 'Cutomer successfully created!' })
  @ApiResponse({ status: 400, description: 'Validation error!' })
  @ApiResponse({ status: 500, description: 'Server side error!' })
  create(@Body() dto: CreateCustomerDto): Promise<Customer> {
    return this.customerCreateUseCase.execute(dto);
  }
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Cutomer successfully found!' })
  @ApiResponse({ status: 400, description: 'Customer not found!' })
  @ApiResponse({ status: 500, description: 'Server side error!' })
  findCustomerById(@Param('id') customerId: string): Promise<Customer> {
    return this.customerFindOneUseCase.execute(customerId);
  }
}

import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateAccountDto } from 'src/domain/dtos';
import { Account } from 'src/domain/entities';
import { AccountCreateUseCase } from '../use-cases/create/account-create.use-case';
import { AccountFindByAccountNumberUseCase } from '../use-cases/find-by-account-number/account-find-by-account-number.use-case';
import { AccountFindOneUseCase } from '../use-cases/find-one/account-find-one.use-case';
import { AccountUpdateAccountStatusUseCase } from '../use-cases/update-account-status/account-update-account-status.use-case';
import { IAccountController } from './interface-account.controller';

@Controller('contas')
export class AccountController
  implements IAccountController<CreateAccountDto, Account>
{
  constructor(
    private readonly accountCreateUseCase: AccountCreateUseCase,
    private readonly accountFindOneUseCase: AccountFindOneUseCase,
    private readonly accountFindByAccountNumberUsecase: AccountFindByAccountNumberUseCase,
    private readonly accountUpdateAccountStatusUseCase: AccountUpdateAccountStatusUseCase,
  ) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Account created successfully!' })
  @ApiResponse({ status: 400, description: 'Error while creating account!' })
  @ApiResponse({ status: 500, description: 'Server side error!' })
  create(@Body() dto: CreateAccountDto): Promise<Account> {
    return this.accountCreateUseCase.execute(dto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Account found successfully!' })
  @ApiResponse({ status: 400, description: 'Account not found!' })
  @ApiResponse({ status: 500, description: 'Server side error!' })
  findAccountById(@Param('id') accountId: string): Promise<Account> {
    return this.accountFindOneUseCase.execute(accountId);
  }

  findAccountByAccountNumber(accountNumber: string): Promise<Account> {
    return this.accountFindByAccountNumberUsecase.execute(accountNumber);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Account updated successfully!' })
  @ApiResponse({ status: 400, description: 'Account not found!' })
  @ApiResponse({ status: 500, description: 'Server side error!' })
  updateAccountStatus(@Param('id') accountId: string): Promise<HttpException> {
    return this.accountUpdateAccountStatusUseCase.execute(accountId);
  }
}

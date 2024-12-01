import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/common/base/use-case';
import { ACCOUNT_STATUS } from 'src/domain/common/enums/account';
import { CreateAccountDto } from 'src/domain/dtos';
import { Account } from 'src/domain/entities';
import { IAccountRepository } from 'src/domain/repositories/account';
import { AccountService } from 'src/domain/services/account/account.service';
import { CustomerFindOneUseCase } from 'src/modules/customer/use-cases/find-one/customer-find-one.use-case';

@Injectable()
export class AccountCreateUseCase
  implements IBaseUseCase<CreateAccountDto, Account>
{
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly accountService: AccountService,
  ) {}
  async execute(dto: CreateAccountDto): Promise<Account> {
    this.accountService.validateCustomerAndCreateAccountStatus(
      dto.customerId,
      dto.status,
    );

    dto.accountNumber = this.accountService.generateAccountNumber();

    const account = await this.accountRepository.create(dto);

    return account;
  }
}

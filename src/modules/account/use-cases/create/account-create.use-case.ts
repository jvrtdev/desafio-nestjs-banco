import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/common/base/use-case';
import { ACCOUNT_REPOSITORY } from 'src/domain/common/constants';
import { ACCOUNT_STATUS } from 'src/domain/common/enums/account';
import { generateAccountNumberUtil } from 'src/domain/common/utils/account/generateAccountNumber.util';
import { CreateAccountDto } from 'src/domain/dtos';
import { Account } from 'src/domain/entities';
import { IAccountRepository } from 'src/domain/repositories/account';
import { CustomerFindOneUseCase } from 'src/modules/customer/use-cases/find-one/customer-find-one.use-case';

@Injectable()
export class AccountCreateUseCase
  implements IBaseUseCase<CreateAccountDto, Account>
{
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly customerFindOneUseCase: CustomerFindOneUseCase,
  ) {}
  async execute(dto: CreateAccountDto): Promise<Account> {
    const customerIsExist = await this.customerFindOneUseCase.execute(
      dto.customerId,
    );

    if (!customerIsExist)
      throw new HttpException(
        'Customer id is required',
        HttpStatus.BAD_REQUEST,
      );

    if (
      dto.status !== ACCOUNT_STATUS.ACTIVE &&
      dto.status !== ACCOUNT_STATUS.INACTIVE
    )
      throw new HttpException('Invalid status', HttpStatus.BAD_REQUEST);

    dto.accountNumber = await generateAccountNumberUtil();

    //const { dataValues } = new Account(dto);

    const account = await this.accountRepository.create(dto);

    return account;
  }
}

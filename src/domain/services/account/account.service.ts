import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ACCOUNT_STATUS } from 'src/domain/common/enums/account';
import { TRANSACTION_TYPE } from 'src/domain/common/enums/transaction';
import { CreateAccountDto } from 'src/domain/dtos';
import { AccountFindOneUseCase } from 'src/modules/account/use-cases/find-one/account-find-one.use-case';
import { CustomerFindOneUseCase } from 'src/modules/customer/use-cases/find-one/customer-find-one.use-case';

@Injectable()
export class AccountService {
  constructor(
    private readonly customerFindOneUseCase: CustomerFindOneUseCase,
    private readonly accountFindOneUseCase: AccountFindOneUseCase,
  ) {}

  generateAccountNumber(): number {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    const ramdomNumber = Math.floor(Math.random() * 1000);

    const accountNumber = Number(`${year}${month}${ramdomNumber}`);

    return accountNumber;
  }

  async validateCustomerAndCreateAccountStatus(
    customerId: string,
    status: ACCOUNT_STATUS,
  ) {
    const customerIsExist =
      await this.customerFindOneUseCase.execute(customerId);

    if (!customerIsExist)
      throw new HttpException(
        'Customer id is required',
        HttpStatus.BAD_REQUEST,
      );

    if (status !== ACCOUNT_STATUS.ACTIVE && status !== ACCOUNT_STATUS.INACTIVE)
      throw new HttpException('Invalid status', HttpStatus.BAD_REQUEST);
  }

  async validateOriginAccountAndDestinationAccount(
    originAccountId: string,
    destinationAccountId: string,
  ) {
    const originAccount =
      await this.accountFindOneUseCase.execute(originAccountId);

    const destinationAccount =
      await this.accountFindOneUseCase.execute(destinationAccountId);

    if (!originAccount || !destinationAccount)
      throw new HttpException(
        'Origin account or destination account not found',
        HttpStatus.BAD_REQUEST,
      );

    return { originAccount, destinationAccount };
  }
}

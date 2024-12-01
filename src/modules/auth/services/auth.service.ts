import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IBaseUseCase } from 'src/domain/common/base/use-case';
import { compareUtil } from 'src/domain/common/utils/bcrypt';
import { CreateAuthDto } from 'src/domain/dtos/auth/create-auth.dto';
import { AuthEntity } from 'src/domain/entities/auth/auth.entity';
import { CPFService } from 'src/domain/services/customer/cpf';
import { CustomerFindByCpfUseCase } from 'src/modules/customer/use-cases/find-by-cpf/customer-find-by-cpf.use-case';

@Injectable()
export class AuthService implements IBaseUseCase<CreateAuthDto, AuthEntity> {
  constructor(
    private readonly jwtService: JwtService,
    private readonly cpfService: CPFService,
    @Inject(forwardRef(() => CustomerFindByCpfUseCase))
    private readonly findByCpf: CustomerFindByCpfUseCase,
  ) {}

  async execute(dto: CreateAuthDto): Promise<AuthEntity> {
    const cpfIsValid = this.cpfService.isValid(dto.cpf);

    if (!cpfIsValid)
      throw new HttpException('Cpf Invalid', HttpStatus.NOT_FOUND);

    const customer = await this.findByCpf.execute(dto.cpf);

    const passwordIsEqual = await compareUtil(dto.password, customer.password);

    if (!passwordIsEqual)
      throw new HttpException('Password invalid', HttpStatus.UNAUTHORIZED);

    const payload = { sub: customer.id, name: customer.fullName };

    const token = this.jwtService.sign(payload);

    return { token };
  }
}

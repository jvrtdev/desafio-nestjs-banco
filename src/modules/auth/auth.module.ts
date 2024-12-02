import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { environment } from 'src/config';
import { CPFService } from 'src/domain/services/customer/cpf';
import { AuthController } from 'src/modules/auth/controllers/auth.controller';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { CustomerModule } from 'src/modules/customer/customer.module';

@Module({
  imports: [
    CustomerModule,
    JwtModule.register({
      secret: environment.JWT_SECRET,
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, CPFService],
  exports: [AuthService],
})
export class AuthModule {}

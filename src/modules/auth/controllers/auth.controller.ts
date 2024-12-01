import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { IsPublic } from 'src/domain/common/decorators/is-public.decorator';
import { CreateAuthDto } from 'src/domain/dtos/auth/create-auth.dto';
import { AuthEntity } from 'src/domain/entities/auth/auth.entity';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post()
  @ApiResponse({ status: 200, description: 'Authorized!' })
  @ApiResponse({ status: 401, description: 'Unauthorized!' })
  login(@Body() createAuthDto: CreateAuthDto): Promise<AuthEntity> {
    return this.authService.execute(createAuthDto);
  }
}

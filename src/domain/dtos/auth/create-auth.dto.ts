import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({
    description: 'CPF of the customer',
    example: '919.261.260-17',
  })
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({
    description: 'Password of the customer',
    example: 'oi',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

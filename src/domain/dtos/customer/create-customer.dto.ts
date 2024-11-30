import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'CPF of the customer',
    example: '919.261.260-17',
  })
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({
    description: 'Date of Birth of the customer',
    example: '2000-01-01',
    type: Date,
  })
  @IsDate()
  @IsNotEmpty()
  dateBirth: Date;

  @ApiProperty({
    description: 'Full name of the customer',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    description: 'Password of the customer',
    example: 'Customer@2024',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

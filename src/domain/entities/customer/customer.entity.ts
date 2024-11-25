import { Customer } from '@prisma/client';

export class CustomerEntity implements Customer {
  id: string;
  fullName: string;
  cpf: string;
  dateBirth: Date;
  createdAt: Date;
}

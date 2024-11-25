import { $Enums, Account } from "@prisma/client";

export class AccountEntity implements Account {
  id: number;
  balance: number;
  createdAt: Date;
  customerId: string;
  status: $Enums.AccountStatus;
}

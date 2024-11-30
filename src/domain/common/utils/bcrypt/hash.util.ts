import * as bcrypt from 'bcrypt';

export function hashUtil(password: string, salt: number = 10): Promise<string> {
  return bcrypt.hash(password, salt);
}

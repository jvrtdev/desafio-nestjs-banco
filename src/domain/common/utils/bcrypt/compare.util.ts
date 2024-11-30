import * as bcrypt from 'bcrypt';

export function compareUtil(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

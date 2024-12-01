export function generateAccountNumberUtil(): number {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();

  const ramdomNumber = Math.floor(Math.random() * 1000000);

  const accountNumber = Number(`${year}${month}${ramdomNumber}`);

  return accountNumber;
}

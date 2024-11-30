export interface ICustomerController<E, T> {
  create(dto: T): Promise<E>;
  findCustomerById(customerId: string): Promise<E>;
}

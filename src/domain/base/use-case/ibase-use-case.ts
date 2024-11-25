export abstract class IBaseUseCase<T, E> {
  abstract execute(data: T): Promise<E>;
}

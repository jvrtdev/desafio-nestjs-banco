export abstract class IBaseUseCase<T, E> {
  abstract execute(dto: T): Promise<E>;
}

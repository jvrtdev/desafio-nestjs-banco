export abstract class IBaseUseCaseNonePromise<T, E> {
  abstract execute(data: T): E;
}

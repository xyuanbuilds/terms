export {};
declare global {
  export type Predicator<T> = (who: T) => who is T;

  export type PlainObject = Object;
}

import inspect = require("object-inspect");

/** global extra */
declare global {
  type PlainObject = Object;

  /** string wont be transformed to NaN  */
  type NumLike = string | number;

  type Predicator<T> = (who: unknown) => who is T;

  type ReadonlyNonEmptyArray<A> = ReadonlyArray<A> & {
    readonly 0: A;
  };

  interface NonEmptyArray<A> extends Array<A> {
    0: A;
    pop(): A;
  }

  type RangeLoop = <L extends NumLike, R extends NumLike>(
    l: L,
    R: R
  ) => <T = number, R = unknown>(
    cb: (item: T) => R,
    items?: Iterable<T>
  ) => void;

  // var utils: {
  //   inspect: inspect;
  // };

  // globalThis = {
  //   utils,
  // };
}

import inspect = require("object-inspect");
import { isNumLike } from "./predicate";

export { inspect };

export const range = (
  ...args: [a: NumLike, b?: NumLike, step?: number]
): ReadonlyArray<number> => {
  let a = args[0];
  let b = args[1];
  let step = args[2];

  if (args.length === 1) {
    b = a;
    a = 0;
  }

  /** b cannot less than 0 */
  if (isNumLike(a) && isNumLike(b)) {
    step = step || 1;

    const r = [];

    if (a <= b) {
      for (let x = Number(a); ((b as number) - x) * step > 0; x += step) {
        r.push(x);
      }
    } else {
      for (let x = Number(a); ((b as number) - x) * step < 0; x -= step) {
        r.push(x);
      }
    }

    return r;
  } else {
    throw new RangeError(`[Range]: Invalid range arguments: ${inspect(args)}`);
  }
};

const makeBy =
  <A>(f: (i: number) => A) =>
  (n: number): ReadonlyNonEmptyArray<A> => {
    const j = Math.max(0, Math.floor(n));
    const out: NonEmptyArray<A> = [f(0)];
    for (let i = 1; i < j; i++) {
      out.push(f(i));
    }
    return out;
  };

export const range1 = (
  start: number,
  end: number
): ReadonlyNonEmptyArray<number> =>
  start <= end ? makeBy((i) => start + i)(end - start + 1) : [start];

export const rangeLoop: RangeLoop = (l, r) => {
  if (isNumLike(l) && isNumLike(r)) {
    const lNum = Number(l);
    const rNum = Number(r);

    return (cb, items) => {
      if (lNum <= rNum) {
        for (let point = lNum; point < rNum; point += 1) {
          cb(items ? items[point] : point);
        }
      } else {
        for (let point = lNum; point > rNum; point -= 1) {
          cb(items ? items[point] : point);
        }
      }
    };
  } else {
    throw new RangeError(
      `[RangeLoop]: Invalid range arguments: ${inspect([l, r])}`
    );
  }
};

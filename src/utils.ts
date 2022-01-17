import inspect = require("object-inspect");
import { isNumLike } from "./predicate";

export { inspect };

export const rangeLoop: RangeLoop = (l, r) => {
  if (isNumLike(l) && isNumLike(r)) {
    const lNum = Number(l);
    const rNum = Number(r);

    return (cb, items) => {
      if (lNum <= rNum) {
        for (let point = lNum; point < rNum; point += 1) {
          cb(items[point]);
        }
      } else {
        for (let point = lNum; point > rNum; point -= 1) {
          cb(items[point]);
        }
      }
    };
  } else {
    throw new RangeError(
      `[Range]: Invalid range arguments: ${inspect([l, r])}`
    );
  }
};

/** swap pair */
export const swap = <L, R = L>([l, r]: Pair<L, R>): [R, L] => [r, l];

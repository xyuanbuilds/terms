import { isFn } from "../predicate";
import type { IComparable } from "../types/ICompare";

interface IPair<L, R> {
  /**
   * The first element.
   */
  first: L;
  /**
   * The second element.
   */
  second: R;
}

class Pair<F, S = F> implements IPair<F, S>, IComparable<Pair<F, S>> {
  constructor(first: F, second: S) {
    this.first = first;
    this.second = second;
  }
  first: F;
  second: S;

  static make_pair<F, S = F>(first: F, second: S) {
    return new Pair(first, second);
  }

  static swap<L, R = L>({ first, second }: Pair<L, R>): Pair<R, L> {
    return Pair.make_pair(second, first);
  }

  less(this: Pair<F, S>, other: typeof this): boolean {
    return (
      this.first < other.first ||
      (!(other.first < this.first) && this.second < other.second)
    );
  }

  equals(
    other: Pair<F, S>,
    compare?: (l: F | S, r: typeof l) => boolean
  ): boolean {
    if (isFn(compare)) {
      return (
        compare(this.first, other.first) && compare(this.second, other.second)
      );
    }
    return this.first === other.first && this.second === other.second;
  }
}

export default Pair;
// const pair = Pair.make_pair(1, "1");
// const f = pair.less(Pair.make_pair(2, '1'));

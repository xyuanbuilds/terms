// * https://juejin.cn/post/6921515173614354445#heading-4
// ! Processing
import type { IPointer } from "../types/Ipointer";

interface IteratorList<T> extends Iterator<List<T>, T, T | null> {}

abstract class Container {
	public abstract size(): number;

	public empty(): boolean {
		return this.size() === 0;
	}

	public abstract begin(): IteratorT;

	public abstract end(): IteratorT;
}

// list 只有size
class List<T> {
	protected begin_;
	protected end_;
	protected p;
	protected last;

	constructor() {
		this.p = this.begin_;
		this.last = this.end_;
	}

	[Symbol.iterator]() {
		let p = this.begin_;

		return {
			next: () => {
				const done = this.p === this.last;
				if (!done) {
					this.p = this.p.next();
				}
				return { done, value: this.p.value };
			},
		};
	}
}

var a = {
	a: 1,
	b: 2,
	[Symbol.iterator]() {
		let begin = "a";

		return {
			next: () => {
				if (begin === "b") {
					return { done: true, value: a[begin] };
				} else {
					const res = { done: false, value: a[begin] };
					begin = "b";
					return res;
				}
			},
		};
	},
};

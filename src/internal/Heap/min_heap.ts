export type HeapComparator<T> = (curValue: T, comparedValue: T) => number;

/**
 * Min heap
 * 堆，默认为最小堆(number)，(a, b) => a - b，改变 comparator 即可变为最大堆
 * @template T 元素类型
 */
export class Heap<T extends unknown = number> {
	static defaultComparator = (l: any, r: any) => l - r;

	protected _capacity: number;
	protected _comparator: HeapComparator<T>;
	protected _stack: T[] = [];

	constructor(compartor?: HeapComparator<T>, capacity?: number) {
		this._capacity = capacity || Number.MAX_SAFE_INTEGER;
		this._comparator = compartor || Heap.defaultComparator;
	}

	getSize() {
		return this._stack.length;
	}

	get size() {
		return this._stack.length;
	}

	toArray() {
		return this._stack;
	}

	insert(value: T) {
		if (this._stack.length < this._capacity) {
			this._stack.push(value);
			this._shiftUp(this.size - 1);
		} else {
			if (this._comparator(value, this._stack[0]) > 0) {
				this._stack[0] = value;
				this._shiftDown(0);
			}
		}
	}

	// 删除堆顶
	pop() {
		if (this.size === 1) {
			return this._stack.shift();
		}
		const top = this._stack[0];
		// pop()方法删除数组最后一个元素并返回，赋值给堆顶
		this._stack[0] = this._stack.pop()!;
		// 对堆顶重新排序
		this._shiftDown(0);
		return top;
	}
	// 获取堆顶
	peek() {
		return this._stack[0];
	}

	_swap(indexFir: number, indexSec: number) {
		// const temp = this._stack[indexFir];
		// this._stack[indexFir] = this._stack[indexSec];
		// this._stack[indexSec] = temp;
		[this._stack[indexFir], this._stack[indexSec]] =
			[this._stack[indexSec], this._stack[indexFir]];
	}

	_getParentIndex(i: number) {
		// return Math.floor((i - 1) / 2);
		return (i - 1) >> 1;
	}

	_shiftUp(index: number) {
		if (index === 0) {
			return;
		}

		const parentIndex = this._getParentIndex(index);
		if (
			this._stack[parentIndex] && this._comparator(
				this._stack[parentIndex],
				this._stack[index],
			) > 0
		) {
			this._swap(parentIndex, index);
			this._shiftUp(parentIndex);
		}
	}

	_getleftIndex(i: number) {
		return (2 * i) + 1;
	}

	_getrightIndex(i: number) {
		return (2 * i) + 2;
	}

	_shiftDown(index: number) {
		const leftIndex = this._getleftIndex(index);
		const rightIndex = this._getrightIndex(index);
		if (
			this._stack[leftIndex] && this._comparator(
				this._stack[leftIndex],
				this._stack[index],
			) < 0
		) {
			this._swap(leftIndex, index);
			this._shiftDown(leftIndex);
		}
		if (
			this._stack[rightIndex] && this._comparator(
				this._stack[rightIndex],
				this._stack[index],
			) < 0
		) {
			this._swap(rightIndex, index);
			this._shiftDown(rightIndex);
		}
	}
}

const a = new Heap((a, b) => b - a);
a.insert(1);
a.insert(2);
a.insert(3);
a.insert(1);
a.insert(1);
const v = a.peek();
console.log(a.toArray());
debugger;

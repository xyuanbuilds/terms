/**
 * https://github.com/isaacs/node-lru-cache/blob/main/index.js#L79
 */
const isPosInt = (n: number) => n && n === Math.floor(n) && n > 0 && isFinite(n);

const getUintArray = (max: number) =>
	!isPosInt(max)
		? Array
		: max <= Math.pow(2, 8)
			? Uint8Array
			: max <= Math.pow(2, 16)
				? Uint16Array
				: max <= Math.pow(2, 32)
					? Uint32Array
					: max <= Number.MAX_SAFE_INTEGER
						? ZeroArray
						: null;

class ZeroArray extends Array {
	constructor(size: number) {
		super(size);
		this.fill(0);
	}
}

export class Stack {
	heap: InstanceType<NonNullable<ReturnType<typeof getUintArray>>>;
	length: number = 0;
	constructor(max: number) {
		const UintArray = getUintArray(max);

		if (!UintArray) {
			throw (new Error("Maximum number exceeded"));
		}

		this.heap = new UintArray(max);
		this.length = 0;
	}
	push(n: number) {
		this.heap[this.length++] = n;
	}
	pop() {
		return this.heap[--this.length];
	}
}

export function swap(arr: any[], i: number, j: number) {
	[arr[i], arr[j]] = [arr[j], arr[i]];
}

export function comparator<T extends number>(l: T, r: typeof l) {
	return (l - r) > 0;
}

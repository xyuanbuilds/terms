/** a
 * 240. 搜索二维矩阵 II
 * [*] 二分查找
 */
export function searchMatrix(matrix: number[][], target: number): boolean {
	const y = matrix.length;
	const x = matrix[0].length;

	let l = 0;
	let r = (x * y) - 1;

	while (l < r) {
		const mid = l + r + 1 >> 1;
		if (matrix[Math.floor(mid / x)][mid % x] <= target) {
			l = mid;
		} else {
			r = mid - 1;
		}
	}

	return matrix[Math.floor(r / x)][r % x] === target;
}
export function searchMatrix1(matrix: number[][], target: number): boolean {
	const y = matrix.length;
	const x = matrix[0].length;

	let l = 0;
	let r = (x * y) - 1;

	while (l < r) {
		const mid = (l + r + 1) >> 1;
		const curY = Math.floor(mid / x);

		const curX = mid % x;
		const cur = matrix[curY][curX];

		if (target < cur) {
			r - 1;
		} else if (target >= cur) {
			l = mid;
		}
	}

	return false;
}

/** a
 * 240. 搜索二维矩阵 II
 * [*] 二分查找
 */
function searchMatrix(matrix: number[][], target: number): boolean {
	const y = matrix.length;
	const x = matrix[0].length;

	for (let i = 0; i < y; i++) {
		let l = 0, r = x - 1;
		while (l < r) {
			const mid = (l + r + 1) >> 1;

			if (matrix[i][mid] < target) {
				// * l 始终替代 mid
				l = mid;
			} else if (matrix[i][mid] === target) {
				return true;
			} else {
				// * r 始终做逼近，所以遍历结束 r 最终可能会在目标点上
				r = mid - 1;
			}
		}
		if (matrix[i][r] == target) {
			return true;
		}
	}

	return false;
}

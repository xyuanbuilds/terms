/** 
 * 48 旋转矩阵
 * 
 * 排序 / 规律 -> 递归
 * 比较奇怪的题目类型
 * 
 * 脑筋急转弯？算是一种规律转化
 * 不要尝试从单边/某一角来考虑，始终记住这是一个矩阵 左边界-当前位置-右边界 始终有个对称性质在
 */
function rotate(matrix: number[][]): void {
	const len = matrix.length;
	rHelper(matrix, 0, len - 1, len - 1);
}

function rHelper(matrix: number[][], start: number, end: number, num: number) {
	if (start < end) {
		for (let i = 0; i < num; i++) {
			let tmp = matrix[start][start + i];
			matrix[start][start + i] = matrix[end - i][start]; // 2, 0 -> 0, 0
			matrix[end - i][start] = matrix[end][end - i]; // 2, 2 -> 2, 0
			matrix[end][end - i] = matrix[start + i][end]; // 0, 2 -> 2, 2
			matrix[start + i][end] = tmp; // 0, 0 -> 0, 2
		}
		rHelper(matrix, start + 1, end - 1, num - 2);
	}
}

/**
 * 旋转排序方法
 */
function rotate1(matrix: number[][]) {
	let row = matrix.length, col = row;
	// 右上部分的元素按照对角线与左下元素互换
	for (let i = 0; i < col; i++) {
		for (let j = i + 1; j < row; j++) {
			[matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
		}
	}
	// 左边元素按照中间线与右边交换元素
	for (let i = 0; i < row; i++) {
		for (let j = 0, k = col - 1; j < k; j++, k--) {
			[matrix[i][j], matrix[i][k]] = [matrix[i][k], matrix[i][j]];
		}
	}
	return;
}

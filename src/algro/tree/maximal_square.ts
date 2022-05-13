/**
 * 221. 最大正方形
 * * 记住就行
 * * min(上, 左, 左上) + 1
 * 
 * 看图理解
 * https://leetcode.cn/problems/maximal-square/solution/li-jie-san-zhe-qu-zui-xiao-1-by-lzhlyle/
 * 
 */
function maximalSquare(matrix: string[][]) {
	if (matrix.length === 0) {
		return 0;
	}
	// const dp = [];
	const rows = matrix.length;
	const cols = matrix[0].length;
	let max = Number.MIN_VALUE;

	// for (let i = 0; i < rows + 1; i++) {
	//   if (i === 0) {
	//     dp[i] = Array(cols + 1).fill(0);
	//   } else {
	//     dp[i] = [0];
	//   }
	// }
	const dp = Array(rows + 1)
		.fill(0)
		.map(() => Array(cols + 1).fill(0));

	for (let i = 1; i < (rows + 1); i++) {
		for (let j = 1; j < (cols + 1); j++) {
			if (matrix[i - 1][j - 1] === "1") {
				dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
				max = Math.max(max, dp[i][j]);
			} else {
				dp[i][j] = 0;
			}
		}
	}

	return max * max;
}

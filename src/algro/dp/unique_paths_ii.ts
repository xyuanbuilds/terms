/**
 * 63 不同路径2
 * [*]
 * 
 * 注意从 0 开始遍历，从 1 开始无法方便解决只有一行到情况
 */
/**
 * 动态规划
 */
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
	const m = obstacleGrid.length;
	const n = obstacleGrid[0].length;
	const dp = Array(m).fill(0).map(() => [...Array(n)].fill(0));
	dp[0][0] = obstacleGrid[0][0] == 1 ? 0 : 1;

	for (let i = 0; i < m; ++i) {
		for (let j = 0; j < n; ++j) {
			if (obstacleGrid[i][j] !== 1) {
				if (i > 0 && j > 0) {
					dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
				} else if (i > 0) {
					dp[i][j] = dp[i - 1][j];
				} else if (j > 0) {
					dp[i][j] = dp[i][j - 1];
				}
			}
		}
	}
	return dp[m - 1][n - 1];
}
// 输入：m = 3, n = 7
// const res = uniquePathsWithObstacles([[0, 0, 0], [0, 1, 0], [0, 0, 0]]);
// debugger;
// 输入：m = 3, n = 2
// 输出：3

/**
 * 64 最小路径和
 * 
 * 网格动态规划，基础的动态规划题，考虑好边界即可
 */
function minPathSum(grid: number[][]): number {
	const x = grid.length;
	const y = grid[0].length;

	for (let i = 0; i < x; ++i) {
		for (let j = 0; j < y; ++j) {
			if ((i - 1) >= 0 && (j - 1) >= 0) {
				grid[i][j] = Math.min(grid[i - 1][j], grid[i][j - 1]) + grid[i][j];
			} else if (i === 0 && j === 0) {
				continue;
			} else if (i === 0) {
				grid[i][j] = grid[i][j - 1] + grid[i][j];
			} else {
				grid[i][j] = grid[i - 1][j] + grid[i][j];
			}
		}
	}
	return grid[x - 1][y - 1];
}
// const res = minPathSum([[1, 2, 3], [4, 5, 6]]);
// debugger;

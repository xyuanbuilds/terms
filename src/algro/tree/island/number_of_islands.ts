/** 
 * 200 岛屿数量
 * 
 * 岛屿问题
 * https://leetcode-cn.com/problems/number-of-islands/solution/dao-yu-lei-wen-ti-de-tong-yong-jie-fa-dfs-bian-li-/
 * 
 * 岛屿问题与树遍历相关，关键点两个：
 * 1. 有多少种move可能就有次dfs/bfs重复计算（上下左右就 4 种，带对角线就 8 种）
 * 2. 遍历后的，影响后续计算的 岛屿 1/海洋 0 设置值为 2，防止重复遍历
 */

// * 可移动 选择
const moves = [[-1, 0], [1, 0], [0, -1], [0, 1]];
function inAreaHoc(xN: number, yN: number) {
	return (x: number, y: number): boolean => {
		return x >= 0 && x < xN && y >= 0 && y < yN;
	};
}
function numIslands(grid: string[][]): number {
	const isInArea = inAreaHoc(grid.length, grid[0].length);
	let res = 0;

	function dfs(x: number, y: number) {
		if (!isInArea(x, y) || grid[x][y] === "0" || grid[x][y] === "2") {
			return;
		}

		if (grid[x][y] === "1") {
			grid[x][y] = "2";
		}

		moves.forEach(
			([xChange, yChange]) => {
				dfs(x + xChange, y + yChange);
			},
		);
	}

	for (let i = 0; i < grid.length; i += 1) {
		for (let j = 0; j < grid[0].length; j += 1) {
			if (grid[i][j] === "1") {
				dfs(i, j);
				res += 1;
			}
		}
	}

	return res;
}
const grid = [
	["1", "1", "1", "1", "0"],
	["1", "1", "0", "1", "0"],
	["1", "1", "0", "0", "0"],
	["0", "0", "0", "0", "0"],
];
// 输出：1

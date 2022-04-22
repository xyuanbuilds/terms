/** 
 * 695 岛屿面积
 * 
 * 注意岛屿面积的存放，需要放置在递归参数上，同时使用引用包裹
 */
export const moves = [[-1, 0], [1, 0], [0, -1], [0, 1]];
function inAreaHoc(xN: number, yN: number) {
	return (x: number, y: number): boolean => {
		return x >= 0 && x < xN && y >= 0 && y < yN;
	};
}
function maxAreaOfIsland(grid: number[][]): number {
	let res = 0;
	const isInArea = inAreaHoc(grid.length, grid[0].length);

	function DFS(x: number, y: number, tmp: { total: number }) {
		if (!isInArea(x, y) || grid[x][y] === 2 || grid[x][y] === 0) {
			return;
		}

		if (grid[x][y] === 1) {
			tmp.total += 1;
			if (tmp.total > res) {
				res = tmp.total;
			}
			grid[x][y] = 2;
		}

		moves.forEach(([xC, yC]) => DFS(x + xC, y + yC, tmp));
	}

	for (let i = 0; i < grid.length; i += 1) {
		for (let j = 0; j < grid[0].length; j += 1) {
			if (grid[i][j] === 1) {
				DFS(i, j, { total: 0 });
			}
		}
	}

	return res;
}
// 输入：grid =
// 输出：6
// 解释：答案不应该是 11 ，因为岛屿只能包含水平或垂直这四个方向上的 1 。
const res = maxAreaOfIsland([
	[0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
	[0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
	[0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
]);
console.log(res);

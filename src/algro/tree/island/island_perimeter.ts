/**
 * 463 岛屿周长
 */
const moves = [[-1, 0], [1, 0], [0, -1], [0, 1]];
function inAreaHoc(xN: number, yN: number) {
	return (x: number, y: number): boolean => {
		return x >= 0 && x < xN && y >= 0 && y < yN;
	};
}

export function islandPerimeter(grid: number[][]): number {
	const m = grid.length;
	const n = grid[0].length;
	const isInArea = inAreaHoc(m, n);

	const start = [];
	for (let i = 0; i < m; i += 1) {
		for (let j = 0; j < n; j += 1) {
			if (grid[i][j] === 1) {
				start[0] = i;
				start[1] = j;
				break;
			}
		}
		if (start[0]) {
			break;
		}
	}

	let res = 0;
	function DFS(x: number, y: number) {
		if (!isInArea(x, y) || grid[x][y] === 0) {
			res += 1;
			return;
		}
		if (grid[x][y] === 2) {
			return;
		}

		if (grid[x][y] === 1) {
			grid[x][y] = 2;
		}

		moves.forEach(([xC, yC]) => DFS(x + xC, y + yC));
	}
	DFS(start[0], start[1]);
	return res;
}

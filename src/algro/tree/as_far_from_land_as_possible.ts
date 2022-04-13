import { isStackNonEmpty as isNonEmpty } from "./DFS";

const test = [[1, 0, 1], [0, 0, 0], [1, 0, 1]];

// * 可移动 选择
const moves = [[-1, 0], [1, 0], [0, -1], [0, 1]];

function inAreaHoc(xN: number, yN: number) {
	return (x: number, y: number): boolean => {
		return x >= 0 && x < xN && y >= 0 && y < yN;
	};
}

/**
 * 1162
 */
function maxDistance(grid: number[][]) {
	const N = grid.length;

	const inArea = inAreaHoc(N, N);

	const queue: number[][] = [];

	for (let i = 0; i < N; i++) {
		for (let j = 0; j < N; j++) {
			if (grid[i][j] == 1) {
				queue.push([i, j]);
			}
		}
	}

	if (!isNonEmpty(queue) || queue.length == (N * N)) {
		return -1;
	}

	let distance = -1;

	while (isNonEmpty(queue)) {
		distance += 1;
		const n = queue.length;
		for (let i = 0; i < n; i += 1) {
			const node = queue.shift();
			const x = node[0];
			const y = node[1];

			for (let move of moves) {
				let x2 = x + move[0];
				let y2 = y + move[1];
				if (inArea(x2, y2) && grid[x2][y2] === 0) {
					grid[x2][y2] = 2;
					queue.push([x2, y2]);
				}
			}
		}
	}
	return distance;
}

maxDistance(test);
debugger;

import { isStackNonEmpty as isNonEmpty } from "../DFS";

// * 可移动 选择
const moves = [[-1, 0], [1, 0], [0, -1], [0, 1]];

function inAreaHoc(xN: number, yN: number) {
	return (x: number, y: number): boolean => {
		return x >= 0 && x < xN && y >= 0 && y < yN;
	};
}

/**
 * 1162
 * 
 * 陆地岛屿，找最大距离
 * 
 * 通过遍历，先获取所有的 岛屿1 坐标，放入 queue 中
 * 开始 BFS，此时转而开始遍历 海洋0 坐标，也就是移动（move遍历）后位置为 0 才推入下一次BFS，BFS 多少层，最远距离就是多少
 * 网格路径 -> 决策树
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

	// * BFS
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

const test = [[1, 0, 1], [0, 0, 0], [1, 0, 1]];
maxDistance(test);
debugger;

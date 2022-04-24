/** 
 * 79 单词搜索
 * 
 * 网格遍历、DFS
 * 更优：回溯
 * 
 * 因为同样是网格遍历，可以类比岛屿问题，但由于无法改值，所以需要有一个保存已选的方式
 * 直接用数组保存是一种方式
 * 更好的方式是采用回溯
 */
const moves = [[-1, 0], [1, 0], [0, -1], [0, 1]];
function inAreaHoc(xN: number, yN: number) {
	return (x: number, y: number): boolean => {
		return x >= 0 && x < xN && y >= 0 && y < yN;
	};
}

export function exist(board: string[][], word: string): boolean {
	const start = word[0];

	const isInArea = inAreaHoc(board.length, board[0].length);

	let find = false;

	for (let m = 0; m < board.length; m += 1) {
		for (let n = 0; n < board[0].length; n += 1) {
			const cur = board[m][n];
			if (cur === start) {
				DFS(m, n, 0, []);
			}
		}
	}

	function DFS(x: number, y: number, tarIndex: number, has: string[]) {
		const key = `${x}_${y}`;
		if (
			!isInArea(x, y) ||
			board[x][y] !== word[tarIndex] ||
			has.find((i) => i === key)
		) {
			return;
		}

		if (tarIndex === (word.length - 1)) {
			find = true;
			return;
		}

		moves.forEach(
			([xC, yC]) => {
				DFS(x + xC, y + yC, tarIndex + 1, [...has, key]);
			},
		);
	}

	// alt.forEach(([x, y]) => DFS(x, y, 1));

	return find;
}

export function exist1(board: string[][], word: string): boolean {
	const start = word[0];

	const isInArea = inAreaHoc(board.length, board[0].length);

	for (let m = 0; m < board.length; m += 1) {
		for (let n = 0; n < board[0].length; n += 1) {
			const cur = board[m][n];
			if (cur === start) {
				if (DFS(m, n, 0)) {
					return true;
				}
			}
		}
	}

	function DFS(x: number, y: number, tarIndex: number) {
		if (!isInArea(x, y) || board[x][y] !== word[tarIndex]) {
			return false;
		}
		if (tarIndex == (word.length - 1)) {
			return true;
		}

		board[x][y] = "\n"; // * 访问过的 board 位置，使用占位，以表示当前已选择

		const res = moves.some(
			([xC, yC]) => {
				return DFS(x + xC, y + yC, tarIndex + 1);
			},
		);

		board[x][y] = word[tarIndex]; // ! 这里的 不可直接返回上方some结果，应该每次都回溯

		return res;
	}

	return false;
}

// 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
// 输出：true

exist(
	[["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]],
	"ABCCED",
);
// exist(
// 	[["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]],
// 	"ABCB",
// );

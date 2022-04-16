/**
 * 139
 * 递归+记忆化：递归可根据参数直接获得
 * 记忆化剪枝
 */
function wordBreak(s: string, wordDict: string[]): boolean {
	const memo: Record<string, boolean> = {};
	function isIn(str: string) {
		if (memo[str] !== undefined) {
			return memo[str];
		}
		const found = !!wordDict.find((i) => i === str);
		memo[str] = found;
		return found;
	}

	// * 无记忆化剪枝，重复计算过多
	// let res = false;
	// function re(toFound: string, start: number) {
	// 	if (start === toFound.length) {
	// 		res = true;
	// 	}

	// 	for (let i = start + 1; i <= toFound.length; i += 1) {
	// 		let curStr = s.slice(start, i);
	// 		const suc = isIn(curStr);

	// 		if (suc) {
	// 			re(toFound, i);
	// 		}
	// 	}
	// }
	// re(s, 0);
	// return res;

	const reMemo: boolean[] = [];
	function re(start: number) {
		if (start === s.length) {
			return true;
		}

		for (let i = start + 1; i <= s.length; i += 1) {
			const suc = isIn(s.slice(start, i));

			if (suc) {
				const suc2 = reMemo[i] !== undefined ? reMemo[i] : re(i);
				if (suc2) {
					reMemo[start] = true;
					return true;
				}
			}
		}
		reMemo[start] = false;
		return false;
	}

	return re(0);
}
// wordBreak(
// 	"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab",
// 	[
// 		"a",
// 		"aa",
// 		"aaa",
// 		"aaaa",
// 		"aaaaa",
// 		"aaaaaa",
// 		"aaaaaaa",
// 		"aaaaaaaa",
// 		"aaaaaaaaa",
// 		"aaaaaaaaaa",
// 	],
// );
// const n = wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]);

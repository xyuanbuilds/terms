/**
 * 76 最小覆盖子串
 * 
 * 滑动窗口
 */
type NeedsNumMap = { [key: string]: number, needs: number };
function minWindow(s: string, t: string): string {
	const needs = Array.prototype.reduce.call<
		string,
		[(res: NeedsNumMap, cur: string) => NeedsNumMap, NeedsNumMap],
		NeedsNumMap
	>(
		t,
		(res, cur) => {
			res[cur] = res[cur] ? res[cur] += 1 : 1;
			res.needs += 1;
			return res;
		},
		{ needs: 0 },
	);
	// const needs = [...t].reduce(
	// 	(res, cur) => {
	// 		res[cur] = res[cur] ? res[cur] += 1 : 1;
	// 		res.needs += 1;
	// 		return res;
	// 	},
	// 	{ needs: 0 },
	// );

	const window = { has: 0 };

	let l = 0;
	let r = 0;

	let curStr = "";
	while (r < s.length) {
		const cur = s[r];
		r += 1;

		if (needs[cur]) {
			const hasInWindow = window[cur] ?? 0;

			window[cur] = hasInWindow ? window[cur] += 1 : 1;
			if (window[cur] <= needs[cur]) {
				window.has += 1;
			}
		}

		if (window.has === needs.needs) {
			curStr =
				curStr
					? curStr.length < (r - l)
						? curStr
						: s.slice(l, r)
					: s.slice(l, r);
		}

		if (window.has >= needs.needs) {
			while (l < r) {
				const cur = s[l];
				l += 1;

				if (needs[cur]) {
					window[cur] -= 1;
					if (window[cur] < needs[cur]) {
						window.has -= 1;
					}
				}

				if (window.has === needs.needs) {
					curStr =
						curStr
							? curStr.length < (r - l)
								? curStr
								: s.slice(l, r)
							: s.slice(l, r);
				}

				if (window.has < needs.needs) {
					break;
				}
			}
		}
	}

	return curStr;
}

/**
 * 循环不优化，超时
 */
function minWindow1(s: string, t: string): string {
	let end = t.length;
	while (end <= s.length) {
		let i = 0;
		let j = end;

		while (j <= s.length) {
			if (has(i, j, s, t)) {
				return s.slice(i, j);
			}
			i += 1;
			j += 1;
		}
		end += 1;
	}

	return "";
}

function has(i: number, j: number, s: string, t: string) {
	let tArr = t.split("");

	for (let p = i; p < j; p += 1) {
		const index = tArr.findIndex((cur) => cur === s[p]);

		if (index >= 0) {
			tArr.splice(index, 1);
		}
		if (tArr.length === 0) {
			return true;
		}
	}

	return false;
}
// 输入：s = "ADOBECODEBANC", t = "ABC"
// 输出："BANC"

// const res = minWindow("ab", "a");
// const res = minWindow("ADOBECODEBANC", "ABC");

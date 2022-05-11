/**
 * 38. 外观数列
 */
function countAndSay(n: number): string {
	let cur = 1;
	let res = "1";

	while (cur < n) {
		let l = 0, r = 0;
		let tmpRes = "";
		while (r < res.length) {
			while (r < res.length && res[l] === res[r]) {
				r += 1;
			}

			tmpRes += `${r - l}${res[l]}`;
			l = r;
		}
		res = tmpRes;
		debugger;
		tmpRes = "";
		cur += 1;
	}

	return res;
}
countAndSay(5);
// 1      1
// 2.     11
// 3.     21
// 4.     1211
// 5.     111221

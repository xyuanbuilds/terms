/**a
 * 942 增减字符串
 */
function diStringMatch(s: string): number[] {
	let arr: number[] = [];
	for (let i = 0; i <= s.length; i += 1) {
		arr.push(i);
	}

	const res: number[] = [];
	for (let str of s) {
		if (str === "D") {
			res.push(arr.pop()!);
		} else {
			res.push(arr.shift()!);
		}
	}
	res.push(arr[0]);
	return res;
}

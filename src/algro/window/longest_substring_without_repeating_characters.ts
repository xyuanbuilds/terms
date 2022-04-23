/**
 * 3 无重复子串
 * 
 * 典型滑动窗口，
 */
function lengthOfLongestSubstring(s: string): number {
	let l = 0, r = 0;
	let res = 0;

	let has: string[] = [];
	let tmp = 0;

	while (r < s.length && l < s.length) {
		const cur = s[r];
		const findIndex = has.findIndex((i) => i === cur);

		if (findIndex >= 0) {
			tmp -= findIndex + 1;
			l = findIndex + 1 + l;
			has = has.slice(findIndex + 1);
			continue;
		} else {
			has.push(cur);
			r += 1;
			tmp += 1;

			res = Math.max(res, tmp);
		}
	}
	return res;
}
// lengthOfLongestSubstring("abcabcbb");
// debugger

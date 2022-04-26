/**
 * 128. 最长连续序列
 * [*]
 * 
 * set 存放（去重），连续序列只需要保证后续连续即可，可以省去位于中间的情况的遍历（前一个数也存在）
 */
function longestConsecutive(nums: number[]): number {
	const set = new Set<number>();
	nums.forEach((i) => set.add(i));

	let res = 0;
	for (let num of nums) {
		if (set.has(num - 1)) {
			continue;
		} else {
			let tmp = 0;
			while (set.has(num + tmp)) {
				tmp += 1;
			}
			res = Math.max(res, tmp);
		}
	}

	return res;
}
// 输入：nums = [100,4,200,1,3,2]
// 输出：4
// 解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
longestConsecutive([100, 4, 200, 1, 3, 2]);

function longestConsecutive1(nums: number[]) {
	// key表示num，value表示num最远到达的连续右边界
	const dp = new Map<number, number>();
	// 初始化每个num的右边界为自己
	for (let num of nums) {
		dp.set(num, num);
	}

	let ans = 0;
	for (let num of nums) {
		if (!dp.has(num - 1)) {
			// 当前数字没有 prev，找后续就可以获得它的最长序列
			let right = dp.get(num)!;
			// 遍历得到最远的右边界
			while (dp.has(right + 1)) {
				right = dp.get(right + 1)!;
			}
			// 更新右边界
			dp.set(num, right);
			// 更新答案
			ans = Math.max(ans, right - num + 1);
		}
	}
	return ans;
}

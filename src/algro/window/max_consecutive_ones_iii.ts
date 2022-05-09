/**
 * 1004. 最大连续1的个数 III
 * 
 * 滑动窗口
 * 
 * 滑动窗口的同时，维持中间需要的值
 */
function longestOnes(nums: number[], k: number): number {
	let l = 0;
	let r = 0;
	let zeros = nums[0] ? 0 : 1;
	let res = 0;

	while (l < nums.length && r < nums.length) {
		if (zeros > k) {
			if (nums[l] === 0) {
				zeros -= 1;
			}
			l += 1;
			continue;
		}

		res = Math.max(res, r - l + 1);

		r += 1;
		if (nums[r] === 0) {
			zeros += 1;
		}
	}

	return res;
}
longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2);

/**
 * 42
 * 暴力解、DP、双指针、单调栈
 */
function trap(height: number[]) {
	let all = 0;
	let lMax = 0;
	for (let index = 0; index < height.length; index += 1) {
		const cur = height[index];
		const rMax = cur < lMax ? getRMax(index + 1, height, lMax) : lMax;
		const curCapacity = cur < lMax && cur < rMax ? Math.min(lMax, rMax) - cur : 0;
		lMax = Math.max(cur, lMax);
		all += curCapacity;
	}

	return all;
}

function getRMax(from: number, nums: number[], limit: number) {
	let res = 0;
	while (res < limit && from < nums.length) {
		res = Math.max(nums[from], res);
		from += 1;
	}

	return res;
}

/**
 * DP 比上方暴力解的优势在于，可减少 getRMax 的遍历过程
 */
function dpTrap(height: number[]) {
	const n = height.length;
	if (n === 0) {
		return 0;
	}
	const dp: number[][] = Array(height.length).map(() => []);

	dp[0][0] = height[0];
	dp[n - 1][1] = height[n - 1];

	// * lMax 递推性来自 从左往右
	for (let i = 1; i < n; i++) {
		dp[i][0] = Math.max(height[i], dp[i - 1][0]);
	}

	// * rMax 递推性来自 从右往左
	for (let i = n - 2; i >= 0; i--) {
		dp[i][1] = Math.max(height[i], dp[i + 1][1]);
	}
	// 遍历每个柱子，累加当前柱子顶部可以储水的高度，
	// 即 当前柱子左右两边最大高度的较小者 - 当前柱子的高度。
	let res = 0;
	for (let i = 1; i < (n - 1); i++) {
		res += Math.min(dp[i][0], dp[i][1]) - height[i];
	}
	return res;
}

trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);

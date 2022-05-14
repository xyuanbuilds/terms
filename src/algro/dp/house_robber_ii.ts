/**
 * 213. 打家劫舍 II
 *
 * * 因为有环，所以要循环两次
 * * 以分别获得取 0 和不取 0 的结果
 * 环状排列意味着 **第一个房子** 和 **最后一个房子** 中只能选择一个偷窃，因此可以把此环状排列房间问题约化为两个单排排列房间子问题
 * 或者为 第一家不偷/第一家偷
 * 在不偷窃第一个房子的情况下（即 nums[1:]nums[1:]），最大金额是 p_1p 1
 * ​在不偷窃最后一个房子的情况下（即 nums[:n-1]nums[:n−1]），最大金额是 p_2p 2
 */
function rob(nums: number[]) {
	if (nums.length < 4) {
		return Math.max(...nums);
	}
	let n = nums.length;
	let dp = [0];

	// * 偷第一家 1，2，4，从 0 开始，n - 1 结束
	for (let i = 0; i < (n - 1); i++) {
		// 第一趟
		dp[i + 1] = Math.max(dp[i], (dp[i - 1] ?? 0) + nums[i]);
	}

	let preMax = dp[n - 1];
	dp = [0];
	debugger;
	// * 不偷第一个家 2，3，3，从 1 开始，n 结束
	for (let i = 1; i < n; i++) {
		// 第二趟
		dp[i] = Math.max(dp[i - 1], (dp[i - 2] ?? 0) + nums[i]);
	}

	return Math.max(preMax, dp[n - 1]);
}

rob([1, 2, 3, 1]);

/**
 * 322
 * [*]
 * 
 * 最少兑换 
 * 
 * 完全背包问题
 * 典型的动态规划，递推性简单
 */
function coinChange(coins: number[], amount: number): number {
	if (amount === 0) {
		return 0;
	}

	const dp = new Array(amount + 1).fill(-1);

	dp[0] = 0;

	for (let i = 1; i <= amount; i += 1) {
		if (i === amount) {
			debugger;
		}
		for (let coin of coins) {
			const rest = i - coin;
			if (rest < 0) {
				continue;
			}
			const prev = dp[rest];

			if (prev >= 0 && dp[i] >= 0) {
				dp[i] = Math.min(prev + 1, dp[i]);
			} else if (prev >= 0) {
				dp[i] = prev + 1;
			}
		}
	}

	return dp[amount];
}
// 输入：coins = [1, 2, 5], amount = 11
// 输出：3
// 解释：11 = 5 + 5 + 1
// const res = coinChange([1, 2, 5], 11);

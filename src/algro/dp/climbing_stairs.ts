/**
 * 70 爬楼梯
 * 
 * 建立递推关系，注意 n 与 dp 数组长度的关系（是否从 0 还是 1 开始）
 */
function climbStairs(n: number): number {
	const dp = [...Array(n + 1)];

	dp[1] = 1;
	dp[2] = 2;

	if (n < 3) {
		return dp[n];
	}

	for (let i = 3; i < dp.length; i += 1) {
		dp[i] = dp[i - 1] + dp[i - 2];
	}

	return dp[n];
}

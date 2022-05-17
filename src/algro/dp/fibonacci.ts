/**
 * 斐波那契
 * 
 * * 用通项式，可以实现 O(1)
 * @param n 
 * @returns 
 */
function fibonacci(n: number) {
	const dp = [];

	dp[1] = 1;
	dp[2] = 2;

	if (n <= 2) {
		return dp[n];
	}

	let i = 3;
	while (i <= n) {
		dp[i] = dp[i - 2] + dp[i - 1];
	}

	return dp[n];
}

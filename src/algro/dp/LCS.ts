class ZeroArray extends Array {
	constructor(size: number) {
		super(size);
		this.fill(0);
	}
}

function longestCommonSubsequence(text1: string, text2: string): number {
	if (text1.length === 1 || !text2) {
		return 0;
	}

	const N = text1.length;
	const M = text2.length;

	const dp = (new ZeroArray(text1.length + 1)).map(
		() => new ZeroArray(text2.length + 1),
	);

	// dp[0][0] = 0;
	// dp[0][1] = 0;
	// dp[1][0] = 0;

	for (let i = 1; i <= N; i += 1) {
		for (let j = 1; j <= M; j += 1) {
			const has = text1[i - 1] === text2[j - 1];
			if (has) {
				// 当前 i、j 相等，必定是一个公共串中的一位，取i、j都不取当前位的值 + 1
				dp[i][j] = dp[i - 1][j - 1] + 1;
			} else {
				// 不等，则分别舍去当前位的结果进行比较，也就是 j 或 i 只有一位可能影响结果
				dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
			}
		}
	}

	return dp[N][M];
}

longestCommonSubsequence("bsbininm", "jmjkbkjkv");

/**
 * 279 完全平方数
 * [*] 完全背包
 * https://leetcode-cn.com/problems/perfect-squares/solution/gong-shui-san-xie-xiang-jie-wan-quan-bei-nqes/
 * 
 * 转化题意：
 *   给定了若干个数字，每个数字可以被使用无限次，求凑出目标值 n 所需要用到的是最少数字个数是多少。
 * 
 * [注]
 * 1. 可选条件下满足重量，是存在无效值的，也就是怎么选都无法满足重量，需要注意占位或用极值替换
 */
function numSquares(n: number): number {
	const list = [];
	let t = 1;
	while ((t * t) <= n) {
		list.push(t * t);
		t++;
	}

	const dp: (number | null)[][] = Array(list.length + 1).fill(0).map(
		() => Array(n + 1).fill(null),
	);
	dp[0][0] = 0;

	for (let i = 1; i <= list.length; i += 1) {
		const cur = list[i - 1];
		for (let w = 0; w <= n; w += 1) {
			// 对于不选第 i 个数的情况
			dp[i][w] = dp[i - 1][w]; // 不选使用上一次的值
			// * 对于选 k 次第 i 个数的情况
			// * 与 0 1 背包不同的地方就在与，完全背包，i 物品可以选多次，知道达到当前限重 w
			for (let k = 1; (k * cur) <= w; k += 1) {
				// 能够选择 k 个 x 的前提是剩余的数字 j - k * x 也能被凑出
				const prevEffective = dp[i - 1][w - (k * cur)];

				if (dp[i][w] === null) {
					if (prevEffective !== null) {
						dp[i][w] = prevEffective + k;
					}
				} else {
					if (prevEffective !== null) {
						dp[i][w] = Math.min(dp[i][w]!, prevEffective + k);
					}
				}
			}
		}
	}
	return dp[list.length][n]!;
}

function numSquares1(n: number) {
	const dp = new Array(n + 1).fill(0);

	// * 二维转一维 从可选物 -> 限重
	for (let i = 1; i <= n; i++) {
		// * 所选物
		for (let j = 1; (j * j) <= i; j++) {
			// * dp[限重]
			dp[i] = Math.min(dp[i] || Number.MAX_SAFE_INTEGER, dp[i - (j * j)] + 1);
		}
	}
	return dp[n];
}

numSquares(10);

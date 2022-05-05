/**
 * 474. 1和0
 * [*]
 * 
 * * 目标是书包内物品的总价值
 * * 而变量是物品和书包的限重
 * 限重随着选择而变化
 * * 递推：可选物品的数量增长
 * * 其他递推状态：剩余的可选价值（价值随着从0开始可递推）
 * 
 * * 背包问题的每一次 i 选择的解都只与上一次选择相关
 * * 背包问题宽泛意义：将前 i 种物品 装进限重为 j 的背包
 * 
 * * 0和1 价值是分成两个的，所以[j] -> [mp][np]
 * 
 * [注]:
 * 1. i部分从 1 开始，因为需要借助上一次，0 位在初始时赋值 0；相应的循环停止需要 <=
 *    因为 dp 使用数组存储，如果从 0 开始 dp[i - 1] 会取不到，所以数组 0 位被用于预防溢出
 * 2. dp[选择个数][剩余应满足权重] = dp[选择个数-1][同剩余权重] | dp[选择个数-1][剩余-当前权重] + 选择后增加价值
 *    dp 部分就是 选择个数少的时候不选 或 选择个数少的时候-当前价值
 *    因为如果选了当前物品，增加的价值就确定了，就可以看前一次选择时，减掉这部分价值后应该满足的价值
 * 
 * [more]
 *   优化空间
 * 
 * https://leetcode-cn.com/problems/ones-and-zeroes/solution/by-flix-a384/
 */
function findMaxForm(strs: string[], m: number, n: number): number {
	const len = strs.length;
	const dp = Array(len + 1).fill(0).map(
		() => Array(m + 1).fill(0).map(() => Array(n + 1).fill(0)),
	);

	for (let i = 1; i <= len; i += 1) {
		const [zero, one] = compute(strs[i - 1]);

		for (let mp = 0; mp <= m; mp += 1) {
			for (let np = 0; np <= n; np += 1) {
				dp[i][mp][np] = dp[i - 1][mp][np]; // * 最少也是上一次的选择

				// * 能把这个字符放包里
				if (mp >= zero && np >= one) {
					dp[i][mp][np] =
						// * 前面选择的价值（当前不选） ｜ 加上现在选择后的价值
						Math.max(dp[i][mp][np], dp[i - 1][mp - zero][np - one] + 1);
				}
			}
		}
	}

	return dp[len][m][n];
}

findMaxForm(["10", "0001", "111001", "1", "0"], 5, 3);

function compute(str: string) {
	let zero = 0;
	let one = 0;
	for (let s of str) {
		if (s === "1") {
			one += 1;
		} else {
			zero += 1;
		}
	}
	return [zero, one];
}
// 输入：strs = ["10", "0001", "111001", "1", "0"], m = 5, n = 3
// 输出：4
// 解释：最多有 5 个 0 和 3 个 1 的最大子集是 {"10","0001","1","0"} ，因此答案是 4 。
// 其他满足题意但较小的子集包括 {"0001","1"} 和 {"10","1","0"} 。
// {"111001"} 不满足题意因为它含 4 个 1 ，大于 n 的值 3 。

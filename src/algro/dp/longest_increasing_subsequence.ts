const test = [1, 3, 4, 2, 5, 6, 7, 8, 6]; // 6;
/**
 * LIS：longest increasing subsequence
 * [*]
 * 最长上升子序列
 * 最长递增子序列
 *
 * 假设d(i) = j，i表示取序列的前i个数，j表示这前i个数字的最长非降序列的长度
 * `d(i) = max{ 1,  d(j)+1}` ,且满足当`i > j`时，`A[i] >= A[j]`
 * @param t
 * @returns
 */
function LIS(t: number[]) {
	let dp = [];
	for (let n = 0; n <= t.length; n += 1) {
		// * 最小 为1，也就是自己
		// * dp[n] 初始化用于后续比较
		dp[n] = 1;

		// ! 每个 n的情况 都需要从 j = 0 开始，j < n，一旦 t[j] < t[n] 说明 可能存在 j 前子序列更长的情况
		// ! 所以需要比较此时 dp[n] 的值做选择
		for (let j = 0; j < n; j += 0) {
			if (t[j] < t[n]) {
				// * 随着 j 的变化，dp[n] 选择与某个 j 生成子序列
				dp[n] = Math.max(dp[n], dp[j] + 1);
			}
		}
	}

	return dp[t.length - 1];
}

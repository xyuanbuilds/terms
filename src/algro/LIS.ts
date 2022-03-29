const test = [1, 3, 4, 2, 5, 6, 7, 8, 6]; // 6;
/**
 * LIS：longest increasing subsequence
 * 最长上升子序列
 *
 * 假设d(i) = j，i表示取序列的前i个数，j表示这前i个数字的最长非降序列的长度
 * `d(i) = max{ 1,  d(j)+1}` ,且满足当`i > j`时，`A[i] >= A[j]`
 * @param t
 * @returns
 */
function LIS(t: number[]) {
  let dp = [];
  for (let n = 0; n <= t.length; n += 1) {
    dp[n] = 1;
    for (let j = 0; j < n; j += 0) {
      if (t[j] < t[n] && dp[n] < dp[j] + 1) dp[n] = dp[j] + 1;
    }
  }

  return dp[t.length - 1];
}

/**
 * 516. 最长回文子序列
 * @param s
 * @returns
 */
function longestPalindromeSubseq(s: string): number {
  const dp = Array(s.length)
    .fill(0)
    .map(() => Array(s.length).fill(0));

  for (let i = 0; i < s.length; i += 1) {
    dp[i][i] = 1;
  }

  // * 从右往左
  // 左边界 由于有右边界，所以 i = length - 2
  for (let i = s.length - 2; i >= 0; i -= 1) {
    // 右边界 从 i + 1 开始
    for (let n = i + 1; n < s.length; n += 1) {
      if (s[n] === s[i]) {
        dp[i][n] = dp[i + 1][n - 1] + 2;
      } else {
        dp[i][n] = Math.max(dp[i + 1][n], dp[i][n - 1]);
      }
    }
  }

  return dp[0][s.length - 1];
}

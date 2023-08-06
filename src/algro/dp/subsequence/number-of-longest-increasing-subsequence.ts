/**
 * 673. 最长递增子序列的个数
 * 输入: [1,3,5,4,7]
 * 输出: 2
 * 解释: 有两个最长递增子序列，分别是 [1, 3, 4, 7] 和  [1, 3, 5, 7]。
 * @param nums
 * @returns
 */
function findNumberOfLIS(nums: number[]) {
  let max = 1;
  const len = nums.length;
  let dp = new Array(len).fill(1); // 当前最大递增数
  let count = new Array(len).fill(1);
  let ans = 0;

  // j 表示左侧已经算完的，从 0 - j 的最长递增个数
  // 所以可以得到方程， 如果 Num[i] > Num[j] i 的递增子序列数 + 1
  // 所以 从 0 - i 遍历，再改变 j 的状态 从 0 - j < i
  // 从左到右，随着 i 增大，需要改变 左 区间算子问题，因为 i 的值依赖左侧的子问题
  for (let i = 0; i < len; i++) {
    // 收缩左
    for (let j = 0; j < i; j++) {
      // 大于，则
      // 1.存在递增
      if (nums[i] > nums[j]) {
        // 2. 需要更新值
        // dp[i]=Math.max(dp[j]+1, dp[i])

        // 大于，说明获得更大的递增了
        if (dp[j] + 1 > dp[i]) {
          dp[i] = dp[j] + 1;
          // 同时更新下 个数 和 最大值
          count[i] = count[j]; // 最长递增子序列的个数(注意是子序列)
          max = Math.max(dp[i], max);

          // 加上 这个值，还更当前一样，说明 之前的 遍历到的j 已经得到 过这个个数的递增了
          // 就是不同的 j（能呈现递增） 让 i 位置得到了同样的 递增个数
          // 所以更新下当前 i 的个数，为加上之前的
        } else if (dp[j] + 1 === dp[i]) {
          count[i] += count[j];
        }
      }
    }
  }

  for (let i = 0; i < len; i++) if (dp[i] == max) ans += count[i];

  return ans;
}

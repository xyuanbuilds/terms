const test = [1, 3, 4, 2, 5, 6, 7, 8, 6]; // 6;
/**
 * LIS：longest increasing subsequence
 * [*]
 * * 300. 最长递增子序列
 *
 * 最长上升子序列
 * 最长递增子序列
 *
 * 假设d(i) = j，i表示取序列的前i个数，j表示这前i个数字的最长非降序列的长度
 * `d(i) = max{ 1,  d(j)+1}` ,且满足当`i > j`时，`A[i] >= A[j]`
 * @param t
 * @returns
 */
// function lengthOfLIS(t: number[]) {
//   let dp = [];
//   for (let n = 0; n <= t.length; n += 1) {
//     // * 最小 为1，也就是自己
//     // * dp[n] 初始化用于后续比较
//     dp[n] = 1;

//     // ! 每个 n的情况 都需要从 j = 0 开始，j < n，一旦 t[j] < t[n] 说明 可能存在 j 前子序列更长的情况
//     // ! 所以需要比较此时 dp[n] 的值做选择
//     for (let j = 0; j < n; j += 0) {
//       if (t[j] < t[n]) {
//         // * 随着 j 的变化，dp[n] 选择与某个 j 生成子序列
//         dp[n] = Math.max(dp[n], dp[j] + 1);
//       }
//     }
//   }

//   return dp[t.length - 1];
// }

function lengthOfLIS(nums: number[]): number {
  const dp = [];
  dp[0] = 1;

  for (let i = 1; i < nums.length; i += 1) {
    dp[i] = 1;
    for (let j = 0; j < i; j += 1) {
      if (nums[j] < nums[i]) {
        // * 最右的数，比当前的数大，说明 j 位置结果 + 1，需要比较一下
        // * 随着 j 的变化，dp[n] 选择与某个 j 生成子序列
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return Math.max(...dp);
}
// 输入：nums = [10,9,2,5,3,7,101,18]
// 输出：4
// 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
// 10 1
// 10，9 1,
function lengthOfLIS(nums: number[]): number {
  const dp = [];
  dp[0] = 1;

  // * 右侧从 1 开始
  for (let r = 1; r < nums.length; r += 1) {
    dp[r] = 1;
    // * 左侧从 0 开始
    for (let l = 0; l < r; l += 1) {
      // * 存在一个右侧 > 左侧，才存在递增
      if (nums[l] < nums[r]) {
        // * 当前 r 位置已有的最长 或 l 位置最长 加上当次增加的
        dp[r] = Math.max(dp[r], dp[l] + 1);
      }
    }
  }
  return Math.max(...dp);
}

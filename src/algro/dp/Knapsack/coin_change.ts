/**
 * 322. 零钱兑换
 * [*]
 *
 * 最少兑换
 *
 * 完全背包问题
 * 典型的动态规划，递推性简单
 */
function coinChange(coins: number[], amount: number): number {
  if (amount === 0) {
    return 0;
  }

  const dp = new Array(amount + 1).fill(-1);

  dp[0] = 0;

  for (let i = 1; i <= amount; i += 1) {
    for (let coin of coins) {
      const rest = i - coin;
      if (rest < 0) {
        // * 剩余的钱能不能被兑换
        continue;
      }

      const restCan = dp[rest];

      if (restCan >= 0 && dp[i] >= 0) {
        // * 都有兑换结果，返回两种选择中小的
        dp[i] = Math.min(restCan + 1, dp[i]);
      } else if (restCan >= 0) {
        // * 没结果的就是 按reset兑换 + 1
        dp[i] = restCan + 1;
      }
    }
  }

  return dp[amount];
}
// 输入：coins = [1, 2, 5], amount = 11
// 输出：3
// 解释：11 = 5 + 5 + 1
const res = coinChange([1, 2, 5], 11);
console.log(res);

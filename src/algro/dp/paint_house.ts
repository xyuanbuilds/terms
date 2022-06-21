/**
 * 剑指 Offer II 091. 粉刷房子
 * @param costs
 * @returns
 */
function minCost(costs: number[][]): number {
  let dp = Array(costs.length)
    .fill(1)
    .map(() => Array(3).fill(0));

  // dp[i][j] i代表房子编号，j代表房颜色
  // * 只有方案 0 的情况
  dp[0][0] = costs[0][0]; // 只有房子 0，房子选
  dp[0][1] = costs[0][1];
  dp[0][2] = costs[0][2];

  // * 随着房子增加，比对之前的最优，获得当前房子下的最优
  // ! costs.length 同时也是房子数，这点需要注意
  for (let i = 1; i < costs.length; i++) {
    // 当前的花费 = 前一次粉刷其他颜色的最小花费 + costs数组本次欲粉刷的颜色花费;
    dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + costs[i][0];
    dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + costs[i][1];
    dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + costs[i][2];
  }
  return Math.min(...dp[costs.length - 1]);
}

// 输入: costs = [[17,2,17],[16,16,5],[14,3,19]]
// 输出: 10
// 解释: 将 0 号房子粉刷成蓝色，1 号房子粉刷成绿色，2 号房子粉刷成蓝色。
//      最少花费: 2 + 5 + 3 = 10。

/**
 * 122. 买卖股票的最佳时机 II
 * 在每一天，你可以决定是否购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以先购买，然后在 同一天 出售。
 */
export function maxProfit2(prices: number[]): number {
  const dp = Array(prices.length)
    .fill(1)
    .map(() => [0, 0]);
  dp[0][0] = 0; // 0 空 购买了 -> 有股票
  dp[0][1] = -prices[0]; // 1 有 购买了 -> 有股票
  for (let i = 1; i < prices.length; i += 1) {
    const price = prices[i];
    const pre = dp[i - 1];
    dp[i][0] = Math.max(pre[0], pre[1] + price); // 空仓表示 继续空 或 卖出后导致空仓
    dp[i][1] = Math.max(pre[1], pre[0] - price); // 有 表示之前就持有 或 刚买入
  }

  return dp[prices.length - 1][0];
}
// 输入：prices = [7,1,5,3,6,4]
// 输出：7
// 解释：在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4 。
//      随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6 - 3 = 3 。
//      总利润为 4 + 3 = 7 。

function maxProfit1(prices: number[]): number {
  const dp = Array(prices.length)
    .fill(1)
    .map(() => Array(2).fill(0));

  dp[0][0] = 0; // 空仓
  dp[0][1] = -prices[0]; // 持有

  for (let i = 1; i < prices.length; i += 1) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]); // 当前空仓： 1. 继续空仓 2.卖出空仓
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]); // 当前持有： 1. 继续持有 2.空仓后买入
  }

  return Math.max(...dp[prices.length - 1]);
}

function maxProfit(prices: number[]): number {
  let res = 0;

  for (let i = 1; i < prices.length; i += 1) {
    if (prices[i] > prices[i - 1]) {
      res += prices[i] - prices[i - 1];
    }
  }

  return res;
}

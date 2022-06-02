/**
 * 62 不同路径
 *
 * 网格 -> 决策树 -> BFS
 */
// const moves = [[1, 0], [0, 1]];

/**
 * 快乐超时，重复遍历
 */
function uniquePaths1(m: number, n: number): number {
  // const grid = [...Array(m - 1)].map(() => Array(n - 1).fill(0));

  const queue = [[0, 0]];
  let res = 0;
  while (queue.length > 0) {
    const cur = queue.shift()!;

    if (cur[0] === m - 1 && cur[1] === n - 1) {
      res += 1;
      continue;
    }
    if (cur[0] + 1 <= m - 1) {
      queue.push([cur[0] + 1, cur[1]]);
    }
    if (cur[1] + 1 <= n - 1) {
      queue.push([cur[0], cur[1] + 1]);
    }
  }

  return res;
}

/**
 * 动态规划
 */
function uniquePaths(m: number, n: number) {
  const dp = Array(m)
    .fill(0)
    .map(() => Array(n).fill(1));

  for (let i = 1; i < m; i += 1) {
    for (let j = 1; j < n; j += 1) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
}

// 输入：m = 3, n = 7
// 输出：28：
const res = uniquePaths(3, 7);
debugger;
// 输入：m = 3, n = 2
// 输出：3

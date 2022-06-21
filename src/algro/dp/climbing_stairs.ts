/**
 * 70 爬楼梯
 * 剑指 Offer 10- II. 青蛙跳台阶问题
 *
 * 建立递推关系，注意 n 与 dp 数组长度的关系（是否从 0 还是 1 开始）
 */
function climbStairs(n: number): number {
  const dp = [...Array(n + 1)];

  dp[1] = 1;
  dp[2] = 2;

  if (n < 3) {
    return dp[n];
  }

  for (let i = 3; i < dp.length; i += 1) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

function memoClimbStairs(n: number): number {
  const memo = {};
  memo[0] = 0;
  memo[1] = 1;
  memo[2] = 2;

  function re(cur) {
    if (memo[cur]) return memo[cur];

    return re(cur - 1) + re(cur - 2);
  }

  return re(n);
}

function climbStairs1(n: number): number {
  let n_2 = 1;
  let n_1 = 2;
  if (n === 1) {
    return 1;
  }
  if (n === 2) {
    return 2;
  }

  // * 递归实现，递归中传递 step 即可
  // * 每一次递归及为爬了一次
  function recursion(
    p1: number,
    p2: number,
    res: number,
    step: number
  ): number {
    if (step === n) {
      return res;
    }
    const cur = p1 + p2;
    p2 = p1;
    p1 = cur;
    step += 1;
    return recursion(p1, p2, cur, step);
  }
  return recursion(n_1, n_2, 3, 2);
}

const res = climbStairs(5);
const res1 = climbStairs1(5);
console.log(res, res1);

function numWays(n: number): number {
  if (n <= 1) {
    return 1;
  }
  if (n === 2) {
    return 2;
  }

  // * 递归实现，递归中传递 step 即可
  // * 每一次递归及为爬了一次

  let n_1 = 1;
  let n_2 = 2;
  let res = 0;
  for (let i = 3; i <= n; i += 1) {
    res = (n_1 + n_2) % 1000000007;
    n_1 = n_2;
    n_2 = res;
  }
  return res;
}

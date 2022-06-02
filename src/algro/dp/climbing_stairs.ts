/**
 * 70 爬楼梯
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

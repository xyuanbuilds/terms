/**
 * 斐波那契
 * 剑指 Offer 10- I. 斐波那契数列
 *
 * * 用通项式，可以实现 O(1)
 * @param n
 * @returns
 */
function fibonacci(n: number) {
  const dp = [0];

  dp[1] = 1;
  dp[2] = 1;

  if (n <= 2) {
    return dp[n];
  }

  let i = 3;
  while (i <= n) {
    dp[i] = dp[i - 2] + dp[i - 1];
    i += 1;
  }

  return dp[n];
}
function fib(n: number) {
  let p1 = 0;
  let p2 = 1;

  if (n <= 1) {
    return n === 0 ? p1 : p2;
  }

  let res = null;
  for (let i = 2; i <= n; i++) {
    res = (p1 + p2) % 1000000007;
    p1 = p2;
    p2 = res;
  }

  return res;
}

/**
 * 2611. 老鼠和奶酪
 * * 贪心、排序、前K
 * * 贪心其实就是 通过对数据处理，做局部最优选择后，不需要回溯已选的（保证局部最优有效）
 * * 像这里就通过 排序 确认了局部最优的有效
 * * 所以如果 无法保证 局部最优有效，就无法用贪心
 * 第一只老鼠（reward1）吃掉 k 块奶酪的情况下，最大 得分为多少
 *
 * 奶酪总数 n > k，也就是 尽量选赚分多的奶酪
 *  选赚分多的奶酪，也就是 reward1 - reward2 大的
 *    所以问题从 reward1 选 k 个，转化为，reward1 选差值 大的 k 个
 *      所以先把 reward1 - reward2 排序，然后选前 k 个
 * 然后最终是要得到 两只老鼠最大 得分
 *   所以 reward2 求和（假设 老鼠2 都选完），然后再加上 reward1 - reward2 前 k 个（分出 k 个给老鼠1 ）
 *
 * @param reward1
 * @param reward2
 * @param k
 * @returns
 */
function miceAndCheese(
  reward1: number[],
  reward2: number[],
  k: number
): number {
  const init = reward2.reduce((res, cur) => {
    return (res += cur);
  }, 0);

  // * 排序且取前 k 个，都可以用优先队列？
  const diffs = reward1
    .map((i, index) => i - reward2[index])
    .sort((a, b) => b - a);

  let res = init;
  let t = 0;
  while (t < k) {
    res += diffs[t];
    t += 1;
  }
  return res;
}

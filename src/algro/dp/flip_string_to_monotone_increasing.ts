/**
 * 剑指 Offer II 092. 翻转字符
 *
 * 单调递增，也就是存在一个位置，左边都是 0 或 左边没有，且 右边都是 1 或 右边没有
 *
 * @param s
 */
function minFlipsMonoIncr(s: string): number {
  let one = 0;
  let res = 0; // 上一次的最优策略

  // * 随着 str 增长
  for (let i = 0; i < s.length; i += 1) {
    const str = s[i];

    // ! 每遇到一次 0，需要选一下最优解
    if (str === "0") {
      // * 左侧 1 全转 0，或 当前 0 转 1
      // res 表示 i 左侧已经递增的最低值
      // * 此时加上 i 继续递增有两种实现
      // * 1. 左侧 1 都转为 0
      // * 2. 当前转为 1，因为左侧也就是上一次的结果也是，全 0 或 仅最后一位是 1？
      res = Math.min(one, res + 1);
    } else {
      // ! 1先不处理，因为不遇到 0 之前，都是递增的
      one += 1;
    }
  }

  return res;
}

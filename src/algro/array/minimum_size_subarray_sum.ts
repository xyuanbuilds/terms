/**
 * 209. 长度最小的子数组
 * 剑指 Offer II 008. 和大于等于 target 的最短子数组
 * [*]
 *
 * 和 >= target
 * 的 最短 结果
 *
 * * 子数组，是连续的，属于窗口类问题
 * @param target
 * @param nums
 */
function minSubArrayLen(target: number, nums: number[]): number {
  // const cache = new Map();
  let min = 0;
  let prefix = 0;

  // * 从 i 开始增加数组的和
  for (let i = 0; i < nums.length; i += 1) {
    prefix += nums[i]; // * 获得前缀的和
    let noNeed = prefix - target; // * 前缀和减去当前目标

    // * 如果有得多，说明当前子数组已经满足要求，可以从左侧减前缀
    if (noNeed > 0) {
      // * 大于 0 说明存在符合的子数组，开始缩短
      let l = 0;
      // * 减去直到 <= 0
      while (noNeed > 0) {
        noNeed -= nums[l];
        l += 1;
      }

      // * 减去直到 <= 0
      // * 此时可能正好不满足目标（< 0），需要l往左退一些
      // * = 0，l正好 ，< 0  l 则需要退一位
      // [l, i]
      const len = i - l + (noNeed < 0 ? 1 : 0) + 1;

      if (min === 0 || len < min) min = len;
    } else if (noNeed === 0) {
      if (min === 0 || i < min) min = i + 1;
    }

    // cache.set(prefix, i);
  }

  return min;
}
// minSubArrayLen(7, [2, 3, 1, 2, 4, 3]);
minSubArrayLen(11, [1, 2, 3, 4, 5]);

// 输入：target = 7, nums = [2,3,1,2,4,3]
// 输出：2
// 解释：子数组 [4,3] 是该条件下的长度最小的子数组。

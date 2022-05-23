/**
 * 209. 长度最小的子数组
 *
 * 和 >= target
 * 的 最短 结果
 *
 * 子数组，是连续的
 * @param target
 * @param nums
 */
function minSubArrayLen(target: number, nums: number[]): number {
  // const cache = new Map();
  let min = 0;
  let prefix = 0;

  for (let i = 0; i < nums.length; i += 1) {
    prefix += nums[i]; // * 获得前缀和
    let noNeed = prefix - target; // 前缀和减去当前目标

    if (noNeed > 0) {
      // * 大于 0 说明存在符合的子数组，开始缩短
      let l = 0;
      // * 减去直到 <= 0
      while (noNeed > 0) {
        noNeed -= nums[l];
        l += 1;
      }

      // * 减去直到 === 0 l 需要往前退一位，< 0  l 则需要退两位
      const len = i - l + (noNeed < 0 ? 2 : 1);

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

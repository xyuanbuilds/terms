/**
 * 剑指 Offer 03. 数组中重复的数字
 * @param nums
 */
function findRepeatNumber(nums: number[]): number {
  const cache = new Map();

  for (let num of nums) {
    if (cache.has(num)) {
      return num;
    } else {
      cache.set(num, true);
    }
  }

  return -1;
}
// 输入：[2, 3, 1, 0, 2, 5, 3]
// 输出：2 或 3

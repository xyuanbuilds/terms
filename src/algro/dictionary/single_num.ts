/**
 * 剑指 Offer II 004. 只出现一次的数字
 * @param nums
 */
function singleNumber(nums: number[]): number {
  const cache: Map<number, boolean> = new Map();

  for (let num of nums) {
    if (cache.has(num)) {
      cache.set(num, false);
    } else {
      cache.set(num, true);
    }
  }

  for (let [key, value] of cache) {
    if (value) {
      return key;
    }
  }

  return -1;
}

// 输入：nums = [2,2,3,2]
// 输出：3
// 只有 3 只出现了一次

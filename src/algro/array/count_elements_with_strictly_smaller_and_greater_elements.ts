/**
 * 2148. 元素计数
 *
 * 遍历的同时对key进行计数
 *
 * @param nums
 * @returns
 */
function countElements(nums: number[]): number {
  const cache = {};

  let smallest = nums[0];
  let biggest = nums[0];
  for (let num of nums) {
    if (biggest < num) biggest = num;
    if (smallest > num) smallest = num;

    if (cache[num]) {
      cache[num] += 1;
    } else {
      cache[num] = 1;
    }
  }

  return Object.keys(cache).reduce((pre, cur) => {
    if (Number(cur) !== smallest && Number(cur) !== biggest) {
      pre += cache[cur];
    }
    return pre;
  }, 0);
}

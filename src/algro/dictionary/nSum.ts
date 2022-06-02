/**
 * nSum
 *
 * [*]
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {};

/**
 * 1. 两数之和
 * @param nums
 * @param target
 */
function twoSum(nums: number[], target: number): number[] {
  // * 哈希记录已经遍历过的内容
  const cache = {};
  for (let i = 0; i < nums.length; i += 1) {
    const need = target - nums[i];

    if (cache[need] !== undefined) return [cache[need], i];

    // * 末尾记录
    cache[nums[i]] = i;
  }

  return [-1, -1];
}
// 输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]
// 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

/**
 * 167. 两数之和 II - 输入有序数组
 * [*]
 *
 * 头尾双指针 示例
 * @param numbers
 * @param target
 */
function twoSum1(numbers: number[], target: number): number[] {
  let i = 0;
  let j = numbers.length - 1;
  while (i < j) {
    const sum = numbers[i] + numbers[j];
    if (sum < target) {
      i += 1;
    } else if (sum > target) {
      j -= 1;
    } else {
      return [i + 1, j + 1];
    }
  }
  return [-1, -1];
}
// 输入：numbers = [2,7,11,15], target = 9
// 输出：[1,2]
// 解释：2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。返回 [1, 2] 。

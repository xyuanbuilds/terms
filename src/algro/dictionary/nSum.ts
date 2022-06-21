/**
 * nSum
 *
 * 两数之和
 *    如果无序，直接遍历的同时 map 记录 num：index
 *    如果有序，可以通过头尾双指针来做逼近
 *
 * [*]
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
/**
 * 三数之和
 * * 1. 先排序
 * * 2. 从 0 开始遍历，遍历到倒数第二位
 * *    三数之和 = 两数之和 + num[i]
 * *      tar = 0 - nums[i]; 寻找两数之和 tar
 * *      left = i + 1, right = length - 1;
 * *    去重1. nums[i] === nums[i - 1] 前面已经处理过了，continue
 * *    去重2. 获取到 tar 后，left<right left+=1，right-=1 都直到取到不同数为止
 * @param nums
 * @returns
 */
function threeSum(nums: number[]) {
  if (nums.length < 3) return [];

  nums.sort((a, b) => a - b); // !排序

  const res = [];

  for (let i = 0; i < nums.length - 2; i++) {
    // * 与上一个数相同去重
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    const target = 0 - nums[i];

    // * 从 i 右侧元素中找 tar = 0 - nums[i]
    // * 之后就是与两数之和相同的头尾双指针
    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[left] + nums[right];
      if (sum == target) {
        res.push([nums[i], nums[left], nums[right]]);

        // * 去重，因为left 右侧可能存在重复的
        while (left < right) {
          left += 1; // left 先走一位
          // * left 取到不同的，不会重复了，退出去重
          if (nums[left - 1] != nums[left]) break;
        }
        while (left < right) {
          // 不管前后相不相等，right 都要往后走
          right -= 1;
          if (nums[right + 1] != nums[right]) break;
        }
      } else if (sum < target) {
        // * 小了，左侧数字增大
        left++;
      } else if (sum > target) {
        // * 大了，右侧数字减小
        right--;
      }
    }
  }
  return res;
}

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
 * 剑指 Offer II 006. 排序数组中两个数字之和
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

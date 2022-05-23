/**
 * 26. 删除有序数组中的重复项
 *
 * 记录型双指针，
 * l 用于修改，并记录有效位置
 * r 用于向后遍历，直到结束
 * https://leetcode.cn/problems/remove-duplicates-from-sorted-array/solution/shuang-zhi-zhen-shan-chu-zhong-fu-xiang-dai-you-hu/
 *
 * @param nums
 */
function removeDuplicates(nums: number[]): number {
  if (nums.length <= 1) return nums.length;

  let l = 0;
  let r = 1;
  while (r < nums.length) {
    while (nums[r] === nums[l]) {
      r += 1;
    }
    if (r < nums.length) nums[(l += 1)] = nums[r];
  }

  return l + 1;
}

/**
 * [✅]
 * @param nums
 * @returns
 */
function remove(nums: number[]): number {
  if (nums == null || nums.length == 0) return 0;
  let l = 0;
  let r = 1;

  while (r < nums.length) {
    if (nums[l] != nums[r]) {
      nums[(l += 1)] = nums[r];
    }
    r += 1;
  }
  return l + 1;
}

removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]);
// 输入：nums = [0,0,1,1,1,2,2,3,3,4]
// 输出：5, nums = [0,1,2,3,4]

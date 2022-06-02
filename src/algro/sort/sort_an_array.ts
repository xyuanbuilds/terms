/**
 * 912 排序数组
 *
 * https://leetcode-cn.com/problems/sort-an-array/solution/fu-xi-ji-chu-pai-xu-suan-fa-java-by-liweiwei1419/
 */
export function sortArray(nums: number[]): number[] {
  quick(nums, 0, nums.length - 1);
  return nums;
}

// * 快速排序
function quick(nums: number[], left: number, right: number) {
  const pIndex = partition(nums, left, right); // 从左往右遍历，排列 left 位置数到它该放置的位置
  quick(nums, left, pIndex - 1);
  quick(nums, pIndex + 1, right);
}

function partition(nums: number[], l: number, r: number) {
  let pivot = nums[l];
  let should = l;
  for (let i = l + 1; i <= r; i += 1) {
    if (nums[i] < pivot) {
      should += 1;
      [nums[i], nums[should]] = [nums[should], nums[i]];
    }
  }

  [nums[l], nums[should]] = [nums[should], nums[l]];

  return should;
}

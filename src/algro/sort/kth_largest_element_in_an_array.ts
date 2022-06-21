// * 让 l 处于它应该处于的位置，
// * 从 l 当前位置左向右遍历，每有一个小于 l 的数，说明 l 排序后的位置，应该向右 移 一位
// * 从 l 到 r 完成比对后，移动的位置即确定
/**
 * 215. 数组中的第K个最大元素
 *
 * partition 可以分割左右边界
 *
 * @param nums
 * @param l
 * @param r
 * @returns
 */

// ! 快排核心思想
// ! 每一次都找到某个元素放在它在数组中排序后的位置 pivot，
// ! 即保证了在该位置之前的元素均比 nums[pivot] 小，在该位置之后的元素均比 nums[pivot] 大
function partition(nums: number[], l: number, r: number) {
  if (l >= r) return l;

  const pivot = nums[l];

  let j = l;
  // * 由于 l 为基准，所以从 l + 1 开始遍历，注意包括r
  for (let i = l + 1; i <= r; i += 1) {
    if (nums[i] < pivot) {
      j += 1; // * j记录需要变化的位置
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
  }
  [nums[l], nums[j]] = [nums[j], nums[l]];
  return j;
}
export function findKthLargest(nums: number[], k: number) {
  let len = nums.length;
  let left = 0;
  let right = len - 1;

  // 转换一下，第 k 大元素的下标是 len - k
  let target = len - k;

  while (true) {
    const pivot = partition(nums, left, right);
    if (pivot === target) {
      return nums[pivot];
    } else if (pivot < target) {
      // 位置确定的在目标左侧，左侧缩减
      // left = index + 1;
      left = pivot + 1;
    } else {
      // 位置确定的在目标右侧，右侧缩减
      right = pivot - 1;
    }
  }
}

findKthLargest([3, 2, 1, 4], 1);

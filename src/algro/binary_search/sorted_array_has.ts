/**
 * 剑指 Offer 53 - I. 在排序数组中查找数字 I
 * @param nums
 * @param target
 * @returns
 */
function search(nums: number[], target: number): number {
  let l = 0;
  let r = nums.length - 1;

  while (l < r) {
    const m = (l + r) >> 1; // m 靠左，r 会往左靠，l + 1（l 往右靠时会到达左边界），最终 l = r 会来到左边界，

    if (nums[m] < target) {
      l = m + 1;
    } else {
      r = m;
    }
  }

  const L = l;

  l = L;
  r = nums.length - 1;
  while (l < r) {
    const m = (l + r + 1) >> 1;

    if (nums[m] <= target) {
      l = m;
    } else {
      r = m - 1;
    }
  }

  return nums[L] === target || nums[r] === target ? r - L + 1 : 0;
}

search([5, 7, 7, 8, 8, 10], 8);

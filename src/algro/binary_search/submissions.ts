/**
 * 704 二分查找
 * * 确定每次 mid 值的有效变化，不要造成死循环
 *
 * m = l + r + 1 >> 1
 *
 * cur < t l = mid / r = mid - 1, arr[l]
 */
function search(nums: number[], target: number): number {
  let l = 0;
  let r = nums.length - 1;

  while (l <= r) {
    const mid = (l + r) >> 1; // * 计算值偏左，所以 l 得 mid + 1

    if (nums[mid] === target) return mid;

    if (nums[mid] < target) {
      l = mid + 1; // * 如果 l = mid，会存在死循环
    } else if (nums[mid] > target) {
      r = mid - 1;
    }
  }

  return -1;
}
export function search1(nums: number[], target: number): number {
  let l = 0;
  let r = nums.length - 1;

  while (l < r) {
    const mid = (l + r + 1) >> 1;
    if (nums[mid] === target) {
      return mid;
    }
    if (nums[mid] < target) {
      l = mid;
    } else {
      r = mid - 1;
    }
  }

  return nums[r] === target ? r : -1;
}

const res = search([0, 2, 4, 6, 8, 9, 10], 8);
console.log(res);

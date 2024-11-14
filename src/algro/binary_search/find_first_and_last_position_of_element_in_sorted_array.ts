/**
 * 34. 在排序数组中查找元素的第一个和最后一个位置
 * [*]
 * 二分边界
 */
/**
 * [✅]
 * 通过改变 mid 的 计算方式，可以获得 左 右边界
 * @param nums
 * @param target
 * @returns
 */
function searchRange(nums: number[], target: number): number[] {
  let l = 0;
  let r = nums.length - 1;

  while (l < r) {
    const mid = (l + r) >> 1; // 靠左，取到左

    if (nums[mid] < target) {
      l = mid + 1; // l 取结果，且逼近到 =，值靠左，求得左边界
    } else {
      r = mid;
    }
  }
  const L = l;

  if (nums[l] !== target) return [-1, -1];
  l = L;
  r = nums.length - 1;
  while (l < r) {
    const mid = (l + r + 1) >> 1; // 靠右，取到右

    if (nums[mid] <= target) {
      l = mid;
    } else {
      r = mid - 1;
    }
  }
  return [L, r];
}
// const res = searchRange([1, 4], 4);
// debugger;
/**
 * 二分之后扩散
 * [✅]
 * @param nums
 * @param target
 * @returns
 */
function searchRange1(nums: number[], target: number): number[] {
  let l = 0;
  let r = nums.length - 1;

  let got = false;
  let tail = null;
  while (l <= r) {
    if (l === r) {
      return nums[l] === target ? [l, r] : [-1, -1];
    }
    const mid = (r + l + 1) >> 1;
    if (nums[mid] < target) {
      l = mid;
    } else if (nums[mid] === target) {
      r = mid;
      got = true;
      break;
    } else {
      r = mid - 1;
      if (nums[r] === target) {
        tail = r;
        got = true;
        break;
      }
    }
  }

  if (got === false) return [-1, -1];

  if (tail) {
    let head = tail;

    while (head >= 0 && nums[head] === target) {
      head -= 1;
    }
    return [head + 1, tail];
  } else {
    let head = r;
    tail = r;

    while (head >= 0 && nums[head] === target) {
      head -= 1;
    }
    while (tail < nums.length && nums[tail] === target) {
      tail += 1;
    }

    return [head + 1, tail - 1];
  }
}
console.log(searchRange2([1, 1, 3, 4, 5, 5, 5, 5, 5], 3));
console.log(1);

function searchRange2(nums: number[], target: number): number[] {
  let left = searchLeftRange(nums, target);
  let right = searchRightRange(nums, target);
  return [left, right];
}

function searchLeftRange(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      right = mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid;
    }
  }

  // target 大于数组中的最大值，left 一直向右查找，数组下标越界
  if (left >= nums.length) return -1;
  // 判断一下 nums[left] 是不是 target（target 位于中间，可能并不存在数组中）
  return nums[left] == target ? left : -1;
}

function searchRightRange(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      left = mid + 1; // mid = left - 1
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid;
    }
  }

  const res = left - 1;
  if (res < 0) return -1;

  // 判断一下 nums[left] 是不是 target（target 位于中间，可能并不存在数组中）
  // 由于等于 target 的时候，left 又加了 1，所以结果要减掉
  return nums[res] == target ? res : -1;
}

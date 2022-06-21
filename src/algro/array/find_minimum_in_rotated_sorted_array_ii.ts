/**
 * 剑指 Offer 11. 旋转数组的最小数字
 *
 * 双指针，特殊归路，左边大于等于右边时，左针移动++，其他右针--
 * @param numbers
 */
function minArray(numbers: number[]): number {
  let l = 0;
  let r = numbers.length - 1;

  while (l < r) {
    if (numbers[l] >= numbers[r]) {
      l += 1;
    } else {
      r -= 1;
    }
  }
  return numbers[l];
}

//* 以及，二分法 ? 不太好理解
function other(numbers: number[]): number {
  let left = 0,
    right = numbers.length - 1;

  while (left < right) {
    let mid = (left + right) >> 1; // 结果靠左

    // 中间的大了，说明发生了旋转，
    if (numbers[mid] > numbers[right]) {
      // !
      left = mid + 1;
    } else if (numbers[mid] < numbers[right]) {
      right = mid;
    } else {
      // 相等时，right -= 1
      // !
      right -= 1;
    }
  }
  return numbers[left]; // 用 left 取结果
}

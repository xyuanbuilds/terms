/**
 * 27 移除元素
 *
 * 头尾指针实现
 */
function removeElement(nums: number[], val: number): number {
  let l = 0;
  let r = nums.length - 1;
  let num = 0;
  while (l <= r) {
    if (nums[r] === val) {
      r -= 1;
      continue;
    }
    if (nums[l] === val) {
      // const tmp = nums[r]
      // nums[r] = nums[l];
      // nums[l] = tmp;
      [nums[l], nums[r]] = [nums[r], nums[r]];

      r -= 1;
    }
    l += 1;
    num += 1;
  }

  return num;
}

removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2); // 5

/**
 * 快慢指针实现
 */
function removeElement1(nums: number[], val: number): number {
  let slow = 0;
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== val) {
      nums[slow] = nums[fast];
      slow++;
    }
  }
  return slow;
}

/**
 * 有序数组，相同元素保留 k 位问题
 */
function removeDuplicatesN(nums: number[], retainNum: number): number {
  let resNum = 0;
  for (let cur of nums) {
    if (resNum < retainNum || nums[resNum - retainNum] != cur) {
      // nums[resNum ++] = cur;
      nums[resNum] = cur;
      resNum += 1;
    }
  }
  return resNum;
}

/**
 * 80
 */
function removeDuplicates(nums: number[]): number {
  if (nums.length <= 2) return nums.length;

  let slow = 0;
  let r = 1;

  for (let quick = 1; quick < nums.length; quick += 1) {
    if (nums[quick] !== nums[slow]) {
      nums[r] = nums[quick];
      r += 1;
      slow = quick;
    } else if (nums[quick] === nums[slow]) {
      if (quick - slow <= 1) {
        nums[r] = nums[quick];
        r += 1;
      }
    }
  }
  return r;
}

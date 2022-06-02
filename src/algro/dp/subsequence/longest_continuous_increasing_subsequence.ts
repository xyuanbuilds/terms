/**a
 * 678. 最长连续递增序列
 */
function findLengthOfLCIS(nums: number[]): number {
  if (nums.length === 0) return 0;
  const dp = [];
  dp[0] = 1;

  let max = 1;
  for (let i = 1; i < nums.length; i += 1) {
    if (nums[i] > nums[i - 1]) {
      dp[i] = dp[i - 1] + 1;
    } else if (nums[i] === nums[i - 1]) {
      // * 等于不会增加，所以为了不影响后续计算，需要置为 1，用于后续相加
      dp[i] = 1;
    } else {
      dp[i] = 1;
    }
    max = Math.max(max, dp[i]);
  }

  return max;
}
/**
 * 双指针
 * @param nums
 * @returns
 */
function findLengthOfLCIS1(nums: number[]) {
  if (nums.length === 0) return 0;
  const n = nums.length;
  let l = 0;
  let r = 1;

  let globalMaxLen = 1;

  while (r < n) {
    if (nums[r] > nums[r - 1]) {
      r += 1;
    } else {
      l = r;
      r += 1;
    }

    globalMaxLen = Math.max(globalMaxLen, r - l);
  }
  return globalMaxLen;
}

// 输入：nums = [1,3,5,4,7]
// 输出：3

function LCIS(nums: number[]) {
  let l = 0;
  let r = 1;
  let max = 1;

  while (r < nums.length) {
    if (nums[r] > nums[r - 1]) {
      r += 1;
      max = Math.max(r - l, max);
    } else {
      l = r; // ! l先移动到 r
      r += 1; // r 再向右
    }
  }

  return max;
}

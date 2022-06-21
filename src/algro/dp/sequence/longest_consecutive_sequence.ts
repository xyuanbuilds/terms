/**
 * 128. 最长连续序列
 * [*]
 * 最简单方式：
 *   因为不要求顺序，可以先 sort
 *   再从左往右 dp
 *
 * 此题不要求原顺序，所以大概率是一个可 dp 的问题
 *
 *
 * 此题是一个求方案数的题
 * 所以需要保证不重复（有相同的数字）
 *
 * set 存放（去重），连续序列只需要保证后续连续即可，可以省去位于中间的情况的遍历（前一个数也存在）
 */
function longestConsecutive(nums: number[]): number {
  const set = new Set<number>();
  nums.forEach((i) => set.add(i));

  let res = 0;
  for (let num of nums) {
    if (set.has(num - 1)) {
      continue;
    } else {
      let tmp = 0;
      while (set.has(num + tmp)) {
        tmp += 1;
      }
      res = Math.max(res, tmp);
    }
  }

  return res;
}
/**
 * 序列，不要求连续，所以可以先排序再dp
 * @param nums
 * @returns
 */
function longestConsecutive1(nums: number[]) {
  if (nums.length === 0) {
    return 0;
  }
  nums.sort((a, b) => a - b);
  const dp = [];
  dp[0] = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] - nums[i - 1] === 1) {
      // * 递增，+ 1
      dp[i] = dp[i - 1] + 1;
    } else if (nums[i] === nums[i - 1]) {
      // * 相同与原值相同
      dp[i] = dp[i - 1];
    } else {
      // * 变小恢复为 1
      dp[i] = 1;
    }
  }
  return Math.max(...dp);
}

function longestConsecutive3(nums: number[]) {
  if (nums.length === 0) {
    return 0;
  }
  nums.sort((a, b) => a - b);

  let pre = 1;
  let max = 1;
  for (let i = 1; i < nums.length; i += 1) {
    if (nums[i] - nums[i - 1] === 1) {
      pre += 1;
      if (pre > max) max = pre;
    } else if (nums[i] === nums[i - 1]) {
      continue;
    } else {
      pre = 1;
    }
  }

  return max;
}
// 输入：nums = [100,4,200,1,3,2]
// 输出：4
// 解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
longestConsecutive([100, 4, 200, 1, 3, 2]);

function longestConsecutive2(nums: number[]) {
  // key表示num，value表示num最远到达的连续右边界
  const dp = new Map<number, number>();
  // 初始化每个num的右边界为自己
  for (let num of nums) {
    dp.set(num, num);
  }

  let ans = 0;
  for (let num of nums) {
    if (!dp.has(num - 1)) {
      // 当前数字没有 prev，找后续就可以获得它的最长序列
      let right = dp.get(num)!;
      // 遍历得到最远的右边界
      while (dp.has(right + 1)) {
        right = dp.get(right + 1)!;
      }
      // 更新右边界
      dp.set(num, right);
      // 更新答案
      ans = Math.max(ans, right - num + 1);
    }
  }
  return ans;
}

// 复习
// 剑指 Offer II 119. 最长连续序列
function longestConsecutiveO(nums: number[]): number {
  nums.sort((a, b) => a - b);

  let res = 1;
  let pre = 1;
  let max = res;
  for (let i = 1; i < nums.length; i += 1) {
    if (nums[i] === nums[i - 1] + 1) {
      res = pre + 1;
      pre = res;
      if (res > max) max = res;
    } else if (nums[i] === nums[i - 1]) {
      res = pre;
    } else {
      res = 1;
    }
    pre = res;
  }

  return max;
}

function longestConsecutiveZ(nums: number[]): number {
  if (nums.length === 0) return 0;
  nums.sort((a, b) => a - b);

  let pre = 1;
  let preN = nums[0];
  let max = 1;

  for (let i = 1; i < nums.length; i += 1) {
    const cur = nums[i];
    if (preN === cur) {
      continue;
    } else if (preN + 1 === cur) {
      pre = pre + 1;
      max = Math.max(max, pre);
    } else {
      pre = 1;
    }
    preN = cur;
  }

  return max;
}

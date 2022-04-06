/**
 * 当前动态规划关键词：最大、连续
 * 1. 最优子结构
 *  递推关系：后一个问题的答案依赖前一个问题（状态转移方程）
 *    形成递推关系就可以形成 状态 -> 子问题 -> 方程
 * 2. 无后效性：子问题的描述没有不确定的地方，有不确定的，就会导致该子问题会影响后续子问题
 */
/**
 * 53. maximum-subarray
 * 此处 dp 理解关键：以某点为 **结束点** 的 最大 连续 子数组
 * 子问题演化：包含 -> 为 结尾的
 * eg: `[-2,1,-3,4,-1,2,1,-5,4]`
 * 子问题：包含 -2 的连续子数组的最大和是多少（有后效性，-2 放哪儿？）；
 * 子问题：以 -2 结尾的连续子数组的最大和是多少；
 *
 * 状态转移方程：
 * dp[i]=max{nums[i],dp[i−1]+nums[i]}
 */
function maxSubArray(nums: number[]) {
  if (nums.length === 0) return 0;

  let fn_1 = nums[0];
  let res = fn_1;

  for (let i = 1; i < nums.length; i += 1) {
    const fn = Math.max(fn_1 + nums[i], nums[i]); // 总得包含 nums[i]

    res = Math.max(fn, res);
    fn_1 = fn;
  }

  return res;
}

// const res = maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]); // 6
// const res = maxSubArray([2, -1, 3, -1]); // 4
// const res = maxSubArray([-2, 1, 0]); // 2
// const res = maxSubArray([3, -2, -3, -3, 1, 3, 0]); // 4
// console.log(res);

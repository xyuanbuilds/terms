/**
 * 1262. 可被三整除的最大和
 * 能被 3 整除，表示 mod 3 为 0
 * 所以有这样一个规律：前 i - 1 个数，取若干个，生成所有的最大和 mod 3 余 j（0 ～ 2）
 * 那对于 第 i 个数 nums[i]，如果不取就是 f(i−1,j) 的值
 * 如果取那么就是 f(i−1,(j−nums[i])mod3)+nums[i] 的值
 * 所以 取两者的最大值就是 f(i,j) 的值
 *
 * * 表格
 * 对于动态规划表格
 * i 为 0 - nums.length
 * j 为 0 - 2
 *
 * *公式
 * f(i,j)=max{f(i−1,j),f(i−1,(j−nums[i])mod3)+nums[i]}
 *
 * * 边界条件
 * 边界条件为 f(0,0)=0 以及 f(0,1)=f(0,2)=−∞
 * 表示当我们没有选取任何数时，和为 0，并且模 3 的余数为 0
 * 对于 f(0,1)、f(0,2) 这两种不合法的状态，由于我们在状态转移中维护的是最大值，因此可以把它们设定成一个极小值。
 *
 * * 优化
 * 所有的 f(i,⋯ ) 只会从 f(i−1,⋯ ) 转移得来，所以只需要保存上一次的值就行，不需要保存整个表
 * @param nums
 */
function maxSumDivThree(nums: number[]): number {
  let f = [0, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];
  for (const num of nums) {
    const g = [...f];
    for (let i = 0; i < 3; ++i) {
      g[(i + (num % 3)) % 3] = Math.max(g[(i + (num % 3)) % 3], f[i] + num);
    }
    f = g;
  }
  return f[0];
}

// 与上方的规律一致，但解法不同
// https://leetcode.cn/problems/greatest-sum-divisible-by-three/solutions/412684/you-xian-zhuang-tai-ji-by-xing-guang-29/
function maxSumDivThree1(nums: number[]): number {
  // 初始状态 和 mod3 之后值 [0, 1, 2]
  let state = [0, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];

  for (let num of nums) {
    // * 当前num mod 3 为 0，加上这个数，和会变大，但是 mod3 的值不变，所以都加上
    if (num % 3 === 0) {
      state = [state[0] + num, state[1] + num, state[2] + num];
    } else if (num % 3 === 1) {
      // * 当前num 会让最后的值 + 1，所以如果最终要为 0 ，则是 用最终值为2的前值 + num，或原值，取其中最大的
      const a = Math.max(state[2] + num, state[0]);
      const b = Math.max(state[0] + num, state[1]);
      const c = Math.max(state[1] + num, state[2]);
      state = [a, b, c];
    } else if (num % 3 === 2) {
      const a = Math.max(state[1] + num, state[0]);
      const b = Math.max(state[2] + num, state[1]);
      const c = Math.max(state[0] + num, state[2]);
      state = [a, b, c];
    }
  }
  return state[0];
}

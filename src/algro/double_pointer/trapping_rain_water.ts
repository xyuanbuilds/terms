/**
 * 42. 盛雨水/接雨水
 *
 * [*]
 * * 头尾双指针
 *
 * 最优双指针
 * 暴力解、DP、双指针、单调栈
 *
 * 能接的水=min(左右两边最高柱子)-当前柱子高度
 */
/**
 * [✅]
 * @param height
 * @returns
 */
function trap(height: number[]) {
  const N = height.length;
  let all = 0;
  let l = 0;
  let r = N - 1;

  let lMax = height[0];
  let rMax = height[N - 1];

  while (l < r) {
    // * 遍历的过程中，可以确定 lMax 和 rMax
    lMax = Math.max(height[l], lMax);
    rMax = Math.max(height[r], rMax);

    // * 如果当前 右边最大更大 右边肯定能兜住当前格子里的的水，按左最大来减就行
    if (lMax < rMax) {
      // * 确认当前左边能兜住，先算左边
      // * lMax 要么是当前，要么是左侧某个大的
      all += lMax - height[l];
      l += 1;
    } else {
      all += rMax - height[r];
      r -= 1;
    }
  }
  return all;
}

function trap1(height: number[]) {
  let all = 0;
  let lMax = 0;
  for (let index = 0; index < height.length; index += 1) {
    const cur = height[index];
    const rMax = cur < lMax ? getRMax(index + 1, height, lMax) : lMax;
    const curCapacity =
      cur < lMax && cur < rMax ? Math.min(lMax, rMax) - cur : 0;
    lMax = Math.max(cur, lMax);
    all += curCapacity;
  }

  return all;
}

function getRMax(from: number, nums: number[], limit: number) {
  let res = 0;
  while (res < limit && from < nums.length) {
    res = Math.max(nums[from], res);
    from += 1;
  }

  return res;
}

/**
 * DP 比上方暴力解的优势在于，可减少 getRMax 的遍历过程
 */
function dpTrap(height: number[]) {
  const n = height.length;
  if (n === 0) {
    return 0;
  }
  const dp: number[][] = Array(height.length).map(() => []);

  dp[0][0] = height[0];
  dp[n - 1][1] = height[n - 1];

  // * lMax 递推性来自 从左往右
  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.max(height[i], dp[i - 1][0]);
  }

  // * rMax 递推性来自 从右往左
  for (let i = n - 2; i >= 0; i--) {
    dp[i][1] = Math.max(height[i], dp[i + 1][1]);
  }
  // 遍历每个柱子，累加当前柱子顶部可以储水的高度，
  // 即 当前柱子左右两边最大高度的较小者 - 当前柱子的高度。
  let res = 0;
  for (let i = 1; i < n - 1; i++) {
    res += Math.min(dp[i][0], dp[i][1]) - height[i];
  }
  return res;
}

trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);

/**
 * 11. 盛最多水的容器
 * [*]
 *
 * 头尾双指针
 * @param height
 * @returns
 */
function maxArea(height: number[]): number {
  let n = height.length;
  let l = 0,
    r = n - 1;

  let max = 0;

  while (l < r) {
    let res = Math.min(height[l], height[r]) * (r - l);

    if (res > max) max = res;
    // * 谁矮谁走
    if (height[l] < height[r]) {
      l += 1;
    } else {
      r -= 1;
    }
  }

  return max;
}

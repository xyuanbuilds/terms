/**
 * 162. 寻找峰值
 *
 * 二分查找
 *
 * 因为存在条件
 * * nums[-1] = nums[n] = -∞
 *
 * 只要数组中存在一个元素比相邻元素大，那么沿着它一定可以找到一个峰值
 *
 * @param nums
 */
function findPeakElement(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    // const mid = Math.floor((left + right ) / 2);
    // * 向下取整，所以用 left 做结果，right 做逼近（r 替换 mid）
    const mid = Math.floor(left + (right - left) / 2);
    // * 左边大，那左侧的曲线存在下降，说明肯定有峰值在左侧收缩右边界
    // * 否则收缩左边界
    if (nums[mid] > nums[mid + 1]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

// * 作弊实现
// * 因为峰值是从左遍历第一个 左侧大于右侧的数，所以一旦遇到，就是峰值
/**
 * ｜
 * ｜  /\
 * ｜ /  \/\
 * ｜/      \
 * ------------
 * ｜
 */
function findPeakElement1(nums: number[]): number {
  for (let i = 0; i < nums.length - 1; i += 1) {
    if (nums[i] > nums[i + 1]) return i;
  }
  return nums.length - 1;
}

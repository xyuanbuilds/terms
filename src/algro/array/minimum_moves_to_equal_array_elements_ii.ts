/**a
 * 462. 最少移动次数使数组元素相等 II
 */
function minMoves2(nums: number[]): number {
  nums.sort((a, b) => a - b);

  let tar = 0;
  if ((nums.length & 1) === 1) {
    tar = nums[nums.length >> 1];
  } else {
    let r = nums.length / 2;
    tar = (nums[r] + nums[r - 1]) >> 1;
  }

  return nums.reduce((pre, cur) => pre + Math.abs(cur - tar), 0);
}

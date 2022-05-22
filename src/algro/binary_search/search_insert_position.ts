/**
 * 35. 搜索插入位置
 * [*] 查找左边界，因为要找最左边的数，或离他最近的左边那个数，所以 l = mid + 1
 *
 * * 二分查找只有一个思想，那就是：逐步缩小搜索区间。
 * * 当 left 与 right 重合的时候，我们就找到了问题的答案，使用这种写法有一个巨大的好处，那就是返回值不需要考虑返回 left 还是 right，因为退出循环以后，它们是重合的
 *  链接：https://leetcode.cn/problems/search-insert-position/solution/te-bie-hao-yong-de-er-fen-cha-fa-fa-mo-ban-python-/
 *
 * @param nums
 * @param target
 */
function searchInsert(nums: number[], target: number): number {
  // ! l 或 r 都取不到的的位置，所以得特殊处理一下
  if (nums[nums.length - 1] < target) {
    return nums.length;
  }

  let l = 0;
  let r = nums.length - 1;

  while (l < r) {
    let mid = (l + r) >> 1;

    if (nums[mid] < target) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }

  return l;
}

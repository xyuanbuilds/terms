/**
 * 88. 合并两个有序数组
 * https://leetcode-cn.com/problems/merge-sorted-array/
 * * 双指针，把大的放末尾，从后往前
 * *
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  let l = m - 1;
  let r = n - 1;

  let cur = m + n - 1;
  while (cur >= 0) {
    if (l < 0) {
      nums1[cur] = nums2[r];
      r -= 1;
    } else if (r < 0) {
      nums1[cur] = nums1[l];
      l -= 1;
    } else {
      if (nums1[l] >= nums2[r]) {
        nums1[cur] = nums1[l];
        l -= 1;
      } else {
        nums1[cur] = nums2[r];
        r -= 1;
      }
    }

    cur -= 1;
  }
}

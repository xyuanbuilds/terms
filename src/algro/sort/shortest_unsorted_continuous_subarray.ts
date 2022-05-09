/** 
 * 581. 最短无序连续子数组
 * [*]
 * 
 * * 变体双指针
 * * 一个循环中双指针可以用 left = i, right = lens - 1 - i 来表示；
 * * 从左往右，找右边界
 * * 从右往左，找左边界
 * 
 * 图例不错
 * https://leetcode-cn.com/problems/shortest-unsorted-continuous-subarray/solution/si-lu-qing-xi-ming-liao-kan-bu-dong-bu-cun-zai-de-/
 */
function findUnsortedSubarray(nums: number[]): number {
	if (nums.length <= 1) {
		return 0;
	}

	let l = 0;
	let r = -1;
	let lMax = nums[0];
	let rMin = nums[nums.length - 1];

	for (let i = 0; i < nums.length; i += 1) {
		const left = nums[i];
		const right = nums[nums.length - 1 - i];

		// lMax = Math.max(lMax, left);
		// rMin = Math.min(rMin, right);

		if (left < lMax) {
			// * 符合要求的顺序关系是，指针所处值 大于 指针左侧最大值
			// * 此处的是 右边界，因为随着遍历 left指向的 最后一个 存在小于 指针左侧最大
			// * left 是从左往右，此处是 最靠右 的错序
			r = i;
		} else {
			lMax = left;
		}

		if (right > rMin) {
			// * 符合要求的顺序关系是，指针所处值 小于 指针右侧侧最小值
			// * 此处的是 左边界，因为随着遍历 right指向的 最后一个 存在大于 指针右侧最小
			// * right 是从右往左，此处是 最靠左 的错序
			r = nums.length - 1 - i;
		} else {
			rMin = right;
		}
	}

	return r - l + 1;
}
// export function findUnsortedSubarray(nums: number[]): number {
// 	if (nums.length <= 1) {
// 		return 0;
// 	}

// 	let i = 1;
// 	while (nums[i] >= nums[i - 1] && i < nums.length) {
// 		i += 1;
// 	}
// 	const left = i - 1;
// 	if (left === nums.length) {
// 		return 0;
// 	}

// 	let max = nums[left];
// 	let right = left;
// 	while (i < nums.length) {
// 		max = Math.max(max, nums[i]);
// 		if (nums[i] < max) {
// 			right = i;
// 		}
// 		i += 1;
// 	}

// 	return right > left ? right - left + 1 : 0;
// }
// 输入：nums = [2,6,4,8,10,9,15]
// 输出：5
// 解释：你只需要对 [6, 4, 8, 10, 9]
findUnsortedSubarray([2, 6, 4, 8, 10, 9, 15]);
// findUnsortedSubarray([1, 2, 3, 4]);

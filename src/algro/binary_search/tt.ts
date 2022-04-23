/** 
 * 33 搜索排序数组
 * 
 */
function search(nums: number[], target: number): number {
	if (nums.length <= 1) {
		return target === nums[0] ? 0 : -1;
	}

	if (target < nums[0] && target > nums[nums.length - 1]) {
		return -1;
	}
	if (target === nums[0]) {
		return 0;
	}
	if (target === nums[nums.length - 1]) {
		return nums.length - 1;
	}
	if (target > nums[0]) {
		let prev = nums[0];
		for (let i = 0; i < nums.length; i += 1) {
			const num = nums[i];
			if (num < prev) {
				return -1;
			}
			if (num === target) {
				return i;
			}
			prev = nums[i];
		}
	} else {
		let prev = nums[nums.length - 1];
		for (let i = nums.length - 1; i >= 0; i -= 1) {
			const num = nums[i];
			if (num > prev) {
				return -1;
			}
			if (num === target) {
				return i;
			}
			prev = nums[i];
		}
	}
	return -1;
}

function search1(nums: number[], target: number) {
	let lo = 0, hi = nums.length - 1, mid = 0;
	while (lo <= hi) {
		mid = lo + ((hi - lo) / 2);
		if (nums[mid] === target) {
			return mid;
		}
		// 先根据 nums[mid] 与 nums[lo] 的关系判断 mid 是在左段还是右段
		if (nums[mid] >= nums[lo]) {
			// 再判断 target 是在 mid 的左边还是右边，从而调整左右边界 lo 和 hi
			if (target >= nums[lo] && target < nums[mid]) {
				hi = mid - 1;
			} else {
				lo = mid + 1;
			}
		} else {
			if (target > nums[mid] && target <= nums[hi]) {
				lo = mid + 1;
			} else {
				hi = mid - 1;
			}
		}
	}
	return -1;
}

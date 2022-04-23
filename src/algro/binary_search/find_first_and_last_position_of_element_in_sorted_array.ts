/**
 * 34 在排序数组中查找元素的第一个和最后一个位置
 * 
 * 区间计算，典型的二分，可以求左边界或右边界，得到后再去求另一个边界，此处采用一次二分直接求得左右
 */
function searchRange(nums: number[], target: number): number[] {
	if (nums.length === 0 || nums[0] > target) {
		return [-1, -1];
	}
	if (nums.length === 1) {
		return nums[0] === target ? [0, 0] : [-1, -1];
	}

	let l = 0;
	let r = nums.length - 1;

	while (l <= r) {
		if (l === r) {
			return nums[l] === target ? [l, r] : [-1, -1];
		}
		if (nums[l] === target) {
			while (nums[l] === target) {
				l -= 1;
			}
			l += 1;
			while (nums[r] !== target) {
				r -= 1;
			}
			break;
		} else if (nums[l] < target) {
			const pre = l;
			l = ((r - l) >> 1) + l;
			if (pre === l) {
				if (nums[r] !== target && nums[l] !== target) {
					return [-1, -1];
				}
				if (nums[r] === target) {
					return [r, r];
				}
			}
		} else {
			r = l;
			l = l >> 1;
		}
	}

	return [l, r];
}
// const res = searchRange([1, 4], 4);
// debugger;

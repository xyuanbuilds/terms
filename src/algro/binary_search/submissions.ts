/**
 * 704 二分查找
 * 
 * m = l + r + 1 >> 1
 * 
 * cur < t l = mid / r = mid - 1, arr[l]
 */
function search(nums: number[], target: number): number {
	let l = 0;
	let r = nums.length - 1;

	while (l < r) {
		const mid = (l + r + 1) >> 1;
		if (nums[mid] === target) {
			return mid;
		}
		if (nums[mid] < target) {
			l = mid;
		} else {
			r = mid - 1;
		}
	}

	return nums[l] === target ? l : -1;
}

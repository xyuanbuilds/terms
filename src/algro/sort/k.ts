// * 让 l 处于它应该处于的位置，
// * 从 l 当前位置左向右遍历，每有一个小于 l 的数，说明 l 排序后的位置，应该向右 移 一位
// * 从 l 到 r 完成比对后，移动的位置即确定
function partition(nums: number[], l: number, r: number) {
	const pivot = nums[l];
	let j = l;
	for (let i = l + 1; i <= r; i += 1) {
		if (nums[i] < pivot) {
			j += 1;
			[nums[i], nums[j]] = [nums[j], nums[i]];
		}
	}
	[nums[l], nums[j]] = [nums[j], nums[l]];
	return j;
}
export function findKthLargest(nums: number[], k: number) {
	let len = nums.length;
	let left = 0;
	let right = len - 1;

	// 转换一下，第 k 大元素的下标是 len - k
	let target = len - k;

	while (true) {
		const index = partition(nums, left, right);
		if (index == target) {
			return nums[index];
		} else if (index < target) {
			// 位置确定的在目标左侧，左侧缩减
			left = index + 1;
		} else {
			// 位置确定的在目标右侧，右侧缩减
			right = index - 1;
		}
	}
}

findKthLargest([3, 2, 1, 4], 1);

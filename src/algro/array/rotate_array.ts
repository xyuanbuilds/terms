/**
 * 189. 轮转数组
 */
function rotate(nums: number[], k: number) {
	let reverse = (nums: number[], start: number, end: number) => {
		while (start < end) {
			[nums[start], nums[end]] = [nums[end], nums[start]];
			start++;
			end--;
		}
		return nums;
	};
	// * 细节点在于 如果k要比现在nums.length还要长，需要取余
	k %= nums.length;

	// * 全转
	reverse(nums, 0, nums.length - 1);
	// * 分别反转
	reverse(nums, 0, k - 1);
	reverse(nums, k, nums.length - 1);
}

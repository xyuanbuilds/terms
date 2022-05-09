/**
 * 283. 除自身以外的乘积
 * 
 * 乘积 = 当前数左边的乘积 * 当前数右边的乘积
 * 
 * 重点：
 *    0 位的左侧积为 1，N-1位的右侧积为 1
 *    i 位的乘积为 已算出的乘积 * 递推算出的乘积
 *    乘积的递推性
 *
 * * 某一侧的乘积是可以用上一次结果缓存的
 * * 从左往右遍历，可以获得左侧乘积
 * * 而此时倒着遍历，则可以用 O(1) 在计算末尾保存下一次的右侧乘积
 * 
 */

function productExceptSelf(nums: number[]) {
	const N = nums.length;
	const output = [];
	output[0] = 1;
	for (let i = 1; i < N; i++) {
		// output[i]是nums[i]的左边积
		output[i] = output[i - 1] * nums[i - 1];
	}

	let right_output = 1; // 保存nums[i]的左边积
	for (let i = N - 1; i >= 0; i--) {
		output[i] *= right_output; // 左边积 乘上 右边积
		right_output *= nums[i]; // 更新右边积
	}
	return output;
}
function productExceptSelf1(nums: number[]) {
	const N = nums.length;
	const output = [];
	output[N - 1] = 1;
	for (let i = N - 2; i >= 0; i++) {
		// output[i]是nums[i]的右边积
		output[i] = output[i + 1] * nums[i + 1];
	}

	let left_output = 1; // 保存nums[i]的左边积
	for (let i = 0; i < N; i--) {
		output[i] *= left_output; // 左边积 乘上 右边积
		left_output *= nums[i]; // 更新右边积
	}
	return output;
}

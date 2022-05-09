/**
 * 713. 乘积小于 K 的子数组
 * [*] 滑动窗口
 * 
 * for 循环所有子序列，时间复杂度较高
 */
function numSubarrayProductLessThanK(nums: number[], k: number): number {
	const n = nums.length;
	let ans = 0;
	if (k <= 1) {
		return ans;
	}
	const all = [];
	for (let l = 0; l < n; l++) {
		let r = l;
		let sum = 1;
		while (r < n) {
			sum *= nums[r];
			if (sum < k) {
				ans += 1;
				all.push(nums.slice(l, r + 1));
			} else {
				break;
			}
			r += 1;
		}
	}
	debugger;
	return ans;
}
numSubarrayProductLessThanK([10, 5, 2, 6], 100);

function numSubarrayProductLessThanK1(nums: number[], k: number) {
	//同样排除k为1的情况比如  [1,1,1] k=1
	if (k <= 1) {
		return 0;
	}
	let left = 0;
	let right = 0;
	//创建一个变量记录路上的乘积
	let mul = 1;
	//记录连续数组的组合个数
	let ans = 0;

	//用右指针遍历整个数组，每次循环右指针右移一次
	while (right < nums.length) {
		//记录乘积
		mul *= nums[right];
		//当大于等于k，左指针右移并把之前左指针的数除掉
		while (mul >= k) {
			mul /= nums[left];
			left++;
		}

		//每次右指针位移到一个新位置，应该加上 x 种数组组合：
		//  nums[right]
		//  nums[right-1], nums[right]
		//  nums[right-2], nums[right-1], nums[right]
		//  nums[left], ......, nums[right-2], nums[right-1], nums[right]
		//共有 right - left + 1 种
		ans += right - left + 1;

		//右指针右移
		right++;
	}
	return ans;
}

/**
 * 152. 乘积最大子数组
 * [*] 乘积DP，由于需要考虑负数，所以需要存储最小值
 * 
 * * 遇到负数，num的最大数 = 前最小 * num | num
 */
function maxProduct(nums: number[]): number {
	let max = 1;
	let min = 1;
	let ans = nums[0];

	for (let num of nums) {
		if (num < 0) {
			[max, min] = [min, max];
		}
		max = Math.max(max * num, num);
		min = Math.min(min * num, num);
		ans = Math.max(ans, max);
	}

	return ans;
}
// function maxProduct(nums: number[]): number {
// 	const N = nums.length;
// 	let l = 1;
// 	let lAll = nums[0];
// 	let rAll = nums[N - 1];
// 	let r = N - 2;
// 	let ans = nums[0];
// 	while (l < N) {
// 		let lRes = lAll * nums[l];
// 		if (lRes > nums[l]) {
// 			lAll = lRes;
// 		} else {
// 			lAll = nums[l];
// 			lRes = lAll;
// 		}
// 		l += 1;
// 		let rRes = rAll * nums[r];
// 		if (rRes > nums[l]) {
// 			rAll = lRes;
// 		} else {
// 			rAll = nums[r];
// 			rRes = rAll;
// 		}
// 		r -= 1;

// 		ans = Math.max(ans, lRes, rRes);
// 	}

// 	return ans;
// }
// 输入: nums = [2,3,-2,4]
// 输出: 6
// 解释: 子数组 [2,3] 有最大乘积 6。

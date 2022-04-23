/**
 * 169 
 * 找到多数元素
 */
function majorityElement(nums: number[]): number {
	nums.sort((a, b) => a - b);
	return nums[Math.floor(nums.length / 2)];
}

/**
 * Boyer-Moore 投票算法
 * 
 * 众数遇众数+1，众数遇其余非众数都-1；
 * 非众数遇到他本身才+1，遇到其他非众数和众数都-1
 * 
 * 变为 0 的过程是一个抵消过程，这个抵消过程一定是一个偶数！
 * 由于众数多，所以两两抵消，最后会余下众数，或余下众数（2个众数）多的三位。
 */
function majorityElement1(nums: number[]) {
	let count = 0, result = -1;
	for (let num of nums) {
		if (count === 0) {
			result = num;
		}
		if (num === result) {
			count += 1;
		} else {
			count -= 1;
		}
	}
	return result;
}

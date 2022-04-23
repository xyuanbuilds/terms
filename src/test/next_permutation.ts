/**
 * 31 下一个排列
 * 
 * 找出这个数组排序出的所有数中，刚好比当前数大的那个数
 * 
 * 特定算法型：字典序
 * 最好结合可视化演变进行理解
 */
function nextPermutation(nums: number[]): void {
	if (nums.length < 2) {
		return;
	}
	if (nums.length === 2) {
		[nums[0], nums[1]] = [nums[1], nums[0]];
		return;
	}

	for (let c = nums.length - 2; c >= 0; c -= 1) {
		if (nums[c] < nums[c + 1]) {
			const to = getSwapIndex(nums, c + 1, nums[c]);

			// * 交换 c 后 大于 c位的 最小的数
			// * 能够交换的 c 位 与 c + 1 位是从右往左的第一个升序（c -> c + 1），c 往右的都是降序
			// * 所以交换一个刚好大于 c 的，并不会改变 c 往后的升降序关系
			swap(nums, c, to);
			// * c 侧完成最小增加后，右侧都是降序如 321，可改小为 123
			// * c 往后都是降序，双指针左右交换即可完成翻转
			reverse(nums, c + 1);
			return;
		}
	}

	nums.sort((a, b) => a - b);
	return;
}

function swap(nums: number[], f: number, t: number) {
	[nums[f], nums[t]] = [nums[t], nums[f]];
}

function reverse(nums: number[], f: number) {
	let l = f;
	let r = nums.length - 1;
	while (l < r) {
		[nums[l], nums[r]] = [nums[r], nums[l]];
		l++;
		r--;
	}
}

function getSwapIndex(nums: number[], start: number, tar: number) {
	let betterNotMax = null;
	let res = null;
	for (let i = start; i < nums.length; i += 1) {
		if (nums[i] > tar) {
			betterNotMax =
				betterNotMax !== null ? Math.min(betterNotMax, nums[i]) : nums[i];
			if (nums[i] === betterNotMax) {
				res = i;
			}
		}
	}
	return res!;
}
// const a = [1, 3, 2];
// nextPermutation(a);

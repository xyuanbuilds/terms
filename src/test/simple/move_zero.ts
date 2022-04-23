/**
 * 283 移动零
 * 
 * 快慢指针基础
 */
function moveZeroes1(nums: number[]): void {
	let l = 0;
	let r = 1;

	while (r < nums.length && l < nums.length) {
		if (nums[l] === 0 && nums[r] !== 0) {
			[nums[l], nums[r]] = [nums[r], nums[l]];
		}

		while (nums[l] !== 0 && l < nums.length) {
			l += 1;
			if (l === nums.length) {
				return;
			}
		}
		r = l + 1;
		while (nums[r] === 0 && r < nums.length) {
			r += 1;
		}
	}
}

function moveZeroes(nums: number[]) {
	let l = 0, r = 0;
	for (let i = 0; i < nums.length; i++) {
		//当前元素!=0，就把其交换到左边，等于0的交换到右边
		if (nums[i] !== 0) {
			[nums[l++], nums[r]] = [nums[r], nums[l]];
		}
		r++;
	}
}

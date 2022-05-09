/** 
 * 287. 寻找重复数
 * 
 * 排序后查找，能过
 * 
 * 快慢指针，将数字类比指针的指向，有重复的就是环，也就能用快慢指针解了
 */
function findDuplicate(nums: number[]): number {
	nums.sort((a, b) => a - b);

	for (let i = 1; i < nums.length; i += 1) {
		if (nums[i] === nums[i - 1]) {
			return nums[i];
		}
	}

	return -1;
}
function findDuplicate1(nums: number[]): number {
	if (nums.length === 2) {
		return nums[0];
	}

	let fast = 0, slow = 0;
	while (true) {
		fast = nums[nums[fast]];
		slow = nums[slow];
		if (fast == slow) {
			break;
		}
	}
	let finder = 0;
	while (true) {
		finder = nums[finder];
		slow = nums[slow];
		if (slow == finder) {
			break;
		}
	}
	return slow;
}

// 输入：nums = [1,3,4,2,2]
// 输出：2
findDuplicate([1, 3, 4, 2, 2]);

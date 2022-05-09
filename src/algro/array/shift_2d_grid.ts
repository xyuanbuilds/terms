/**
 * 1260. 二维网格迁移
 * 
 * 二维转一维 再操作旋转
 */
function shiftGrid(grid: number[][], k: number): number[][] {
	const flat = [];
	const x = grid.length;
	const y = grid[0].length;
	for (let i = 0; i < x; i += 1) {
		for (let j = 0; j < y; j += 1) {
			flat.push(grid[i][j]);
		}
	}

	rotate(flat, k);

	for (let i = 0; i < x; i += 1) {
		for (let j = 0; j < y; j += 1) {
			grid[i][j] = flat[(i * y) + j];
		}
	}

	return grid;
}

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

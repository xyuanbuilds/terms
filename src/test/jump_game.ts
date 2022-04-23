/**
 * 55 跳跃游戏
 * 
 * 为了到达终点，可多跳也可少跳，典型的贪心类问题
 * 因为要能走到终点，表示中间所有格子都能走到，
 * 然后每个位置走的距离不同，每走一个格子可以获得最远能走到的位置，
 * 这样往后走每次更新最远距离，直到走到最后，或任意的最远距离都走不到的地方
 * 直接看最远能到达的距离（每次都跳最远），如果当前位置大于最大能到达的距离，表示怎么都无法到达
 */

/**
 * 选择 -> 决策树DFS 差点超时
 */
function canJumpBasic(nums: number[]): boolean {
	if (nums.length === 0) {
		return false;
	}
	if (nums.length === 1) {
		return true;
	}

	const tar = nums.length - 1;

	let res = false;
	const memo = new Set();
	function DFS(start: number) {
		const lens = nums[start];
		for (let i = 1; i <= lens; i += 1) {
			const next = start + i;
			if (memo.has(next)) {
				continue;
			}
			if (next === tar) {
				res = true;
				return;
			}
			if (next < tar) {
				memo.add(next);
				DFS(next);
			} else if (next > tar) {
				continue;
			}
		}
	}
	DFS(0);

	return res;
}
/**
 * * 贪心
 * 能往右走尽量走，因为不管走多远，中间不能断层才是关键（有断层，一定是false）
 * 断层代表，前面的任意一个位置，走最远的距离，都无法到达的位置
 * 查看此处解释：https://leetcode-cn.com/problems/jump-game/solution/by-diyao-vhow/
 * 有断层（走到 i，处 为 0）
 */
function canJump(nums: number[]) {
	let maxSafeX = 0;
	for (let i = 0; i < nums.length; i++) {
		if (i > maxSafeX) {
			return false;
		}
		maxSafeX = Math.max(maxSafeX, i + nums[i]);
	}
	return true;
}

/**
 * 动态规划
 */
function canJumpDP(nums: number[]) {
	const dp = new Array(nums.length).fill(false); //初始化dp
	dp[0] = true; //第一项能到达
	for (let i = 1; i < nums.length; i++) {
		for (let j = 0; j < i; j++) {
			// 当前位置j能达到，并且当前位置j加上能到达的位置如果超过了i，那dp[i]更新为true，
			// i位置也可以到达
			if (dp[j] && (nums[j] + j) >= i) {
				dp[i] = true;
				break;
			}
		}
	}

	return dp[nums.length - 1];
}

/**
 * 反向
 * 
 * 也算是动态规划的一种，因为从后往前，就体现出了递推性，且无后效
 * 相当于只要能往前就尽量往前走
 */
function canJump1(nums: number[]) {
	// 必须到达end下标的数字
	let end = nums.length - 1;

	for (let i = nums.length - 2; i >= 0; i--) {
		if ((end - i) <= nums[i]) {
			end = i;
		}
	}

	return end == 0;
}

// 输入：nums = [2,3,1,1,4]
// 输出：true
// 输入：nums = [3,2,1,0,4]
// 输出：false
const res = canJump([2, 3, 1, 1, 4]);
// const res = canJump([3, 2, 1, 0, 4]);
debugger;

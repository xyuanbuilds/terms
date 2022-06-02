/**
 *  198 打家劫舍
 *  [*]
 * 
 *  打家劫舍问题都有一个特点，表面需要穷举，实际在穷举的过程中会发现，会存在重复计算的情况（参数相同），此时如果采用 memo 的方法，
 *  也就算完成减枝了
 *  然后这类问题大概率能够使用 DP
 *  打家劫舍问题还有一个特征，就是结果似乎需要遍历到末尾且与前面的选择都有关系，
 *  这时候不要去想整体， 不妨思考一下，i 位与它的前一位，或它的前几位能不能构成一个关系
 *  也就是，如果结果是 i 位，怎么通过 i- 1位获得结果，通过 i- 2位能获得结果吗？
 *  或许就能够理解递推性质，不要从 i - 2 -> i 进行递推，而要反着推；
 *
 *  典型动态规划
 *  先实现递归版本
 */
export function rob1(nums: number[]) {
	let res = 0;
	function DFS(start: number, prev: number, stop: boolean) {
		if (start === nums.length) {
			res = Math.max(res, prev);
			return;
		}
		if (stop) {
			DFS(start + 1, prev, false);
		} else {
			const cur = nums[start];
			DFS(start + 1, prev + cur, true);
			DFS(start + 1, prev, false);
		}
	}

	DFS(1, 0, false);
	DFS(1, nums[0], true);
	return res;
}

/**
 * 完成记忆化减枝，可以满足基本速度要求
 */
function robMemo(nums: number[]) {
	let res = 0;
	const set = new Set();
	function DFS(start: number, prev: number, stop: boolean) {
		if (start === nums.length) {
			res = Math.max(res, prev);
			return;
		}
		const next = start + 1;
		if (stop) {
			const key = `${next}_${prev}_false`;
			if (!set.has(key)) {
				set.add(key);
				DFS(next, prev, false);
			}
		} else {
			const cur = nums[start];
			const key1 = `${next}_${prev + cur}_true`;
			const key2 = `${next}_${prev}_false`;
			if (!set.has(key1)) {
				set.add(key1);
				DFS(next, prev + cur, true);
			}
			if (!set.has(key2)) {
				set.add(key2);
				DFS(next, prev, false);
			}
		}
	}

	DFS(1, 0, false);
	DFS(1, nums[0], true);
	return res;
}

function robDP(nums: number[]) {
	if (nums.length < 2) {
		return nums?.[0] || 0;
	}
	if (nums.length === 2) {
		return Math.max(nums[0], nums[1]);
	}

	const dp: number[] = Array(nums.length + 1).fill(0);

	dp[0] = nums[0];
	dp[1] = Math.max(nums[0], nums[1]);
	for (let i = 2; i < nums.length; i += 1) {
		dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
	}

	return dp[nums.length - 1];
}
// rob1([2, 7, 9, 3, 1]);
rob1([1, 1, 1]);
// 输入：[2,7,9,3,1]
// 输出：12
// 解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
//      偷窃到的最高金额 = 2 + 9 + 1 = 12 。

/** q
 * 416 分割等和子集
 * [*] 01背包变体
 * 
 * * 用填表理解背包问题
 * https://leetcode-cn.com/problems/partition-equal-subset-sum/solution/0-1-bei-bao-wen-ti-xiang-jie-zhen-dui-ben-ti-de-yo/
 * 
 * * 正序会覆盖掉后面的值，逆序为了更新前面的值
 */
function canPartition(nums: number[]) {
	const tar = nums.reduce((pre, cur) => pre + cur) / 2;

	if ((tar % 1) > 0) {
		return false;
	}

	const dp = Array(nums.length + 1).fill(0).map(
		() => Array(tar + 1).fill(false),
	);
	dp[0][0] = true;

	for (let i = 1; i <= nums.length; i += 1) {
		const cur = nums[i - 1]; // 1 / 2 / 5
		for (let w = 0; w <= tar; w += 1) {
			if (w === 0) {
				dp[i][w] = true;
				continue;
			}
			if ((w - cur) >= 0) {
				// ! 由于是确认当前数字选择是否满足，所以都是dp[i - 1]
				dp[i][w] = dp[i - 1][w] || dp[i - 1][w - cur];
			} else {
				dp[i][w] = dp[i - 1][w];
			}
		}
	}

	return dp[nums.length][tar];
}
function canPartition2(nums: number[]) {
	const tar = nums.reduce((pre, cur) => pre + cur) / 2;

	if ((tar % 1) > 0) {
		return false;
	}

	const dp = Array(tar + 1).fill(false);
	dp[0] = true;

	for (let i = 1; i <= nums.length; i += 1) {
		const cur = nums[i - 1];

		for (let w = tar; w >= cur; w -= 1) {
			if ((w - cur) >= 0) {
				dp[w] = dp[w] || dp[w - cur];
			}
		}
	}

	return dp[tar];
}

function canPartition1(nums: number[]) {
	const sum = (nums.reduce((p, v) => p + v));
	if (sum & 1) {
		return false;
	}
	const tar = sum / 2;
	const dp = Array(tar + 1).fill(0);

	// * i顺序不重要
	for (let i = 0; i < nums.length; i++) {
		// !反向
		for (let j = tar; j >= nums[i]; j--) {
			dp[j] = Math.max(dp[j], dp[j - nums[i]] + nums[i]);
			if (dp[j] === tar) {
				return true;
			}
		}
	}
	return false;
}
// https://leetcode-cn.com/problems/partition-equal-subset-sum/solution/bang-ni-ba-0-1bei-bao-xue-ge-tong-tou-by-px33/

// canPartition([1, 5, 11, 5]);
canPartition2([1, 5, 11, 5]);

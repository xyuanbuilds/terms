/**a
 * 494. 目标和
 * [*]
 * 
 * https://leetcode-cn.com/problems/target-sum/solution/dong-tai-gui-hua-si-kao-quan-guo-cheng-by-keepal/
 * * 
 * * dp[i][j + sum] =
 * *     dp[i - 1][j + nums[i] + sum] + dp[i - 1][j - nums[i] + sum];
 * 
 * * dp[j] = dp[j] + dp[j - cur];
 * 
 * * 数组没有负数位，所以 j -> j + sum
 * * 求个数，所以是 +
 * * 越界不影响当前结果 + 0
 * 
 * * 一部分负数，一部分正数，所以所有数绝对值和 - 负数绝对值(不带负数) - 负数绝对值(负数参与计算) = tar
 * * 计算获得 tar -> sum - 2neg ()
 * * (tar - sum) / 2 = 整数neg，也就是
 * * 选一些数和为整数neg的选择数量
 * 
 * 高价值 -> 低价值
 */
function findTargetSumWays2(nums: number[], tar: number) {
	const sum = nums.reduce((p, cur) => p + cur, 0);
	if (Math.abs(tar) > sum) {
		return 0;
	}
	if (((tar - sum) & 1) === 1) {
		return 0;
	}

	const len = nums.length;
	const neg = (tar - sum) / 2;

	const dp = Array(len + 1).fill(0).map(() => Array(neg + 1).fill(0));
	dp[0][0] = 1;

	for (let i = 1; i <= len; i += 1) {
		const num = nums[i - 1];
		for (let j = 0; j <= neg; j++) {
			dp[i][j] = dp[i - 1][j];

			if (j >= num) {
				// * 当前限制 > 当前物品，可以选
				// * 此时的dp为，选了的方案数 + 不选的方案数
				dp[i][j] += dp[i - 1][j - num];
			}
		}
	}

	return dp[len - 1][neg];
}

function findTargetSumWays1(nums: number[], s: number) {
	const sum = nums.reduce((p, cur) => p + cur, 0);
	// 绝对值范围超过了sum的绝对值范围则无法得到
	if (Math.abs(s) > Math.abs(sum)) {
		return 0;
	}

	// 绝对值，必须小于和
	// 当目标值大于数组元素的最大值，即所有元素选择+的情况；
	if (Math.abs(s) > sum) {
		return 0;
	}
	// * 可选优化 目标 + 总和必须是偶数，才能获得计算结果
	if (((s + sum) & 1) === 1) {
		return 0;
	}

	const len = nums.length;

	const dp = Array(len).fill(0).map(() => Array((2 * sum) + 1).fill(0)); // 这个数组是从总和为-sum开始的
	//加上sum纯粹是因为下标界限问题，赋第二维的值的时候都要加上sum
	// 初始化   第一个数只能分别组成+-nums[i]的一种情况
	dp[0][sum + nums[0]] += 1;
	dp[0][sum - nums[0]] += 1;
	for (let i = 1; i < len; i++) {
		const cur = nums[i];
		for (let j = -sum; j <= sum; j++) {
			const post = j + cur;
			const neg = j - cur;
			if (post > sum) {
				//+不成立 加上当前数大于了sum   只能减去当前的数
				// * 需要 j + sum 而不是 j 因为无负数位
				dp[i][j + sum] = dp[i - 1][j - nums[i] + sum] + 0;
			} else if (neg < -sum) {
				//-不成立  减去当前数小于-sum   只能加上当前的数
				dp[i][j + sum] = dp[i - 1][j + nums[i] + sum] + 0;
			} else {
				//+-都可以
				dp[i][j + sum] =
					dp[i - 1][j + nums[i] + sum] + dp[i - 1][j - nums[i] + sum];
			}
		}
	}
	return dp[len - 1][sum + s];
}

function findTargetSumWays(nums: number[], target: number) {
	// 01背包问题是选或者不选，在本题中时nums数组元素必选，而选或者不选的是+或者-号；
	// 先将本题转换为01背包问题；
	// 假设满足要求的表达式中：所有符号为+的元素之和为x；所有符号为-的元素之和的绝对值为y;
	// x= (target + sum) / 2
	// 将问题转换为nums中挑选出几个数其和为x；转化为01背包装满问题；容量为x的的01背包\U0001f392问题;

	const sum = nums.reduce((p, cur) => p + cur, 0);

	// 绝对值，必须小于和
	// 当目标值大于数组元素的最大值，即所有元素选择+的情况；
	if (Math.abs(target) > sum) {
		return 0;
	}
	// * 可选优化 目标 + 总和必须是偶数，才能获得计算结果
	if (((target + sum) & 1) === 1) {
		return 0;
	}
	//dp数组定义：dp[j]代表填满容量为j的背总共有dp[j]种方法；
	// 最大容量x
	const x = (target + sum) / 2;
	// dp初始化；dp[0]=1,实际含义：填满容量为 0 的背包只有1中方法；
	const dp = Array(x + 1).fill(0);
	dp[0] = 1;

	debugger;

	// 递推公式dp[j]=dp[j]+dp[j-nums[i]]
	for (let num of nums) {
		for (let j = x; j >= num; j--) {
			dp[j] = dp[j] + dp[j - num];
		}
	}

	return dp[x];
}
findTargetSumWays([1, 1, 1, 1, 1], 3);

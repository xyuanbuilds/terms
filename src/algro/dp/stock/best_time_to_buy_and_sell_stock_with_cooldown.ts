/**
 * 309 
 * 
 * 典型二维动态规划
 * 
 * 通过递归可以确认两个维度： 1. prices 自然增长；2. 做完选择后当前状态 及 下一次做选择前的状态
 * 变量 则是 可做的选择，而 可做选择 会受到 当前状态影响，而产生变化，这也是维度二还有分叉的原因
 */
function maxProfit(prices: number[]): number {
	if (prices.length <= 1) {
		return 0;
	}
	if (prices.length === 2) {
		return prices[1] > prices[0] ? prices[1] - prices[0] : 0;
	}

	let res = 0;

	function re(start: number, total: number, status: undefined | number | null) {
		if (start === prices.length) {
			res = Math.max(res, total);
			return;
		}
		const price = prices[start];

		const next = start + 1;
		if (status === null) {
			// 冻结
			re(next, total, undefined); // 跳过
		} else if (status === undefined) {
			// 空仓
			re(next, total, undefined); // 继续不买
			re(next, total, price); // 买入
		} else {
			// 持有
			re(next, total + (price - status), null); // 卖出
			re(next, total, status); // 不卖
		}
	}

	re(0, 0, undefined);

	return res;
}

function maxProfit1(prices: number[]): number {
	if (prices.length <= 1) {
		return 0;
	}
	if (prices.length === 2) {
		return prices[1] > prices[0] ? prices[1] - prices[0] : 0;
	}

	const dp: [number, number, number][] = [...Array(prices.length)].map(
		() => ([0, 0, 0]),
	);
	dp[0] = [0, -prices[0], 0];

	for (let i = 1; i < prices.length; i += 1) {
		const price = prices[i];
		const pre = dp[i - 1];
		dp[i][0] = Math.max(pre[0], pre[2]); // 空仓表示 继续空 或 之前冻结
		dp[i][1] = Math.max(pre[1], pre[0] - price); // 持有 表示之前就持有 或 空仓刚买入
		dp[i][2] = pre[1] + price; // 冻结表示 之前持有刚卖出
	}

	return Math.max(...dp[prices.length - 1]);
}
// const res = maxProfit1([1, 2, 3, 0, 2]);

// debugger;

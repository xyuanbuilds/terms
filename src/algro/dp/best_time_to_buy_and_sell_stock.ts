/**
 * 121
 * 只需要上一个结果的动规
 */
export function maxProfit(prices: number[]): number {
	let min = 0;
	let res = 0;
	for (let price of prices) {
		min = Math.min(price, min);

		res = Math.max(res, min !== price ? price - min : 0);
	}

	return res;
}

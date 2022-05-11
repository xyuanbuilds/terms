/**
 * 56 合并区间
 * [*]
 * 
 * 滑动窗口
 */
function merge(intervals: number[][]): number[][] {
	intervals.sort((v1, v2) => v1[0] - v2[0]);
	const res = Array(intervals.length)
		.fill(0)
		.map(() => [...Array(2)]);
	let idx = -1;
	for (let interval of intervals) {
		// 如果结果数组是空的，或者当前区间的起始位置 > 结果数组中最后区间的终止位置，
		// 则不合并，直接将当前区间加入结果数组。
		// * 不用合并直接是一个独立区间
		// * 因为 左 > prev右 所以与上一个区间没有交集
		if (idx === -1 || interval[0] > res[idx][1]) {
			res[idx += 1] = interval;
		} else {
			// 反之将当前区间合并至结果数组的最后区间
			// * 和入上一个区间
			res[idx][1] = Math.max(res[idx][1], interval[1]);
		}
	}

	return res.slice(0, idx + 1);
}

const res = merge([[1, 3], [2, 6], [8, 10], [15, 18]]);
debugger;

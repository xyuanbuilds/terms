/**
 * 1288 删除区间
 * 
 * 区间都是使用贪心算法的概念
 * 
 * 贪心可解决问题特点，排序后，可递推，同时取得越大也不影响
 * 
 * 贪心算法的思想是在每一步都选取最优的方案，从而得到全局最优解。
 * 典型的贪心算法拥有 `O(N logN)` 的时间复杂度且包括两个步骤：
 * 解决如何排序输入数据。该步骤会消耗 `O(N logN)` 的时间。并且可以直接通过排序或间接使用堆数据结构来完成，通常排序比堆使用要好，因为没有额外空间的使用。
 * 构造一个解决方案解析排序后的输入数据花费 `O(N)`。
 */
function removeCoveredIntervals(intervals: number[][]): number {
	intervals.sort((a, b) => a[0] - b[0]);
	const len = intervals.length;
	let remove = 0;
	for (let i = 0; i < (len - 1); i += 1) {
		const next = intervals[i + 1];
		const cur = intervals[i];
		if (cur[0] === next[0]) {
			// 左相等，右边界取大的
			remove += 1;
			next[1] = Math.max(next[1], cur[1]);
		} else if (cur[1] >= next[0]) {
			// next 与 cur 有交集
			if (next[1] <= cur[1]) {
				// 是有 next 右边界 在 cur 内
				remove += 1;
				[intervals[i], intervals[i + 1]] = [intervals[i + 1], intervals[i]]; // 能覆盖的用于下一次比对
			}
		}
	}
	return len - remove;
}

function removeCoveredIntervals1(intervals: number[][]) {
	// * 优化，sort的时候判断 左右边界同时判断
	intervals.sort((a, b) => a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]);
	const len = intervals.length;
	let n = 1;
	for (let i = 1; i < len; i++) {
		if (intervals[i][1] > intervals[i - 1][1]) {
			n += 1;
		} else {
			intervals[i] = intervals[i - 1];
		}
	}
	return n;
}
// 输入：intervals = [[1,4],[3,6],[2,8]]
// 输出：2
// 解释：区间 [3,6] 被区间 [2,8] 覆盖，所以它被删除了。
// removeCoveredIntervals([[1, 4], [3, 6], [2, 8]]); // 2
removeCoveredIntervals1([[1, 2], [1, 4], [3, 4]]); // 1
// removeCoveredIntervals([
// 	[34335, 39239],
// 	[15875, 91969],
// 	[29673, 66453],
// 	[53548, 69161],
// 	[40618, 93111],
// ]);


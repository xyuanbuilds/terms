function can(intervals: [number, number][]): boolean {
	intervals.sort((a, b) => a[0] - b[0]);

	// let prev = null;
	// for (let interval of intervals) {
	// 	if (prev && interval[0] < prev[1]) {
	// 		return false;
	// 	}
	// 	prev = interval;
	// }

	for (let i = 1; i < intervals.length; i++) {
		if (intervals[i][0] < intervals[i - 1][1]) {
			return false;
		}
	}
	return true;
}
// 输入: intervals = [[0, 30], [5, 10], [15, 20]];
// 输出: e

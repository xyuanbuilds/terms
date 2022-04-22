/**
 * 57 插入区间
 * 
 * 本质还是边界比对，把握好 相等也是需要合并，以及合并是直接改引用数值
 * 
 * 由于一开始循环只做了合并与找到需要插入的index，所以后面会多一次 splice 操作，时间肯定不是最优的
 */
function insert(intervals: number[][], newInterval: number[]): number[][] {
	if (intervals.length === 0 || newInterval[1] < intervals[0][0]) {
		return [newInterval].concat(intervals);
	}
	if (newInterval[0] > intervals[intervals.length - 1][1]) {
		return intervals.concat([newInterval]);
	}

	intervals.sort((v1, v2) => v1[0] - v2[0]);

	let res = [];
	let willInset = -1;
	let insert = [newInterval[0], newInterval[1]];
	for (let i = 0; i < intervals.length; i += 1) {
		const prev = intervals[i - 1];
		const cur = intervals[i];
		if (cur[1] < newInterval[0] || cur[0] > newInterval[1]) {
			if (prev && prev[1] < newInterval[0] && cur[0] > newInterval[1]) {
				willInset = i;
			}
			res.push(intervals[i]);
			continue;
		}

		if (willInset < 0) {
			willInset = i;
		}
		insert[0] = Math.min(cur[0], insert[0]);
		insert[1] = Math.max(cur[1], insert[1]);

		if (intervals[i + 1][0] > insert[i]) {
			res.push(insert);
		}
	}

	// res.splice(willInset, 0, insert);
	return res;
}

/**
 * 所以需要想办法在循环的同时，讲节点插入进去
 * 
 * 依旧是边界判断，只是如果有需要在循环中插入的操作，不可在原循环节点上进行，必须用额外的变量存放结果
 */
function insert1(intervals: number[][], newInterval: number[]): number[][] {
	if (intervals.length === 0 || newInterval[1] < intervals[0][0]) {
		return [newInterval].concat(intervals);
	}
	if (newInterval[0] > intervals[intervals.length - 1][1]) {
		return intervals.concat([newInterval]);
	}

	intervals.sort((v1, v2) => v1[0] - v2[0]);

	let res = [];

	for (let i = 0; i < intervals.length; i += 1) {
		const prev = intervals[i - 1];
		const cur = intervals[i];
		if (cur[1] < newInterval[0] || cur[0] > newInterval[1]) {
			if (prev && prev[1] < newInterval[0] && cur[0] > newInterval[1]) {
				res.push(newInterval);
			}
			res.push(intervals[i]);
			continue;
		}

		newInterval[0] = Math.min(cur[0], newInterval[0]);
		newInterval[1] = Math.max(cur[1], newInterval[1]);
		if (!intervals[i + 1] || intervals[i + 1][0] > newInterval[1]) {
			res.push(newInterval);
		}
	}

	return res;
}
// const res = insert([[0, 10], [14, 14], [15, 20]], [11, 11]);
// debugger;
// 输入：intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
// 输出：[[1,2],[3,10],[12,16]]
// 解释：这是因为新的区间 [4,8] 与 [3,5],[6,7],[8,10] 重叠。

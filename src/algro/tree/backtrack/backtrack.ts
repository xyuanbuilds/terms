/**
 * 排列、子集、组合
 * 组合要防止重复（不同的组合子项完全重复），需要一个 start 变量
 * 而排列不同，顺序不同即为不重复，所以为了避免，需要每次通过检测，来判断是否重复
 * 组合：回溯、策略树、start
 * 排列：回溯、策略树、find/contains（剪枝、遍历中跳过）
 * 子集：数学归纳（子问题推导）、策略树、start
 *
 * 关键部分
 *  1. 每次backtrack调用循环前，是上一次选择结束后的（也代表即将进行新的选择）的时间点，此处可判断选择是否已满足要求（前序判断）
 *  2. backtrack的循环代表选择的过程，又是需要判断是否可选，不可选择 continue
 *  3. 选择 -> backtrack进入下一次选择 -> 取消选择
 */

/**
 * 子集
 * nums 互不相同，返回该数组所有可能的子集（不重复）
 *
 * `nums = [1,2,3]` -> `[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]`
 */
function subsets(nums: number[]): number[][] {
	const result: number[][] = [];
	function backtrack(items: number[], start: number, tmp: number[]) {
		result.push([...tmp]); // 前序位置获得结果并返回

		// 使用过的 i 不再使用
		for (let i = start; i < items.length; i += 1) {
			const cur = items[i];
			tmp.push(cur); // 选择
			backtrack(nums, i + 1, tmp);
			tmp.pop(); // 撤销
		}
	}

	backtrack(nums, 0, []);
	return result;
}

/**
 * 子集
 * nums 包含重复元素，返回所有可能的子集
 *
 * `nums = [1,2,2]` -> `[[],[1],[1,2],[1,2,2],[2],[2,2]]`
 */
function subsetsWithDup(nums: number[]): number[][] {
	const result: number[][] = [];

	function backtrack(items: number[], start: number, tmp: number[]) {
		result.push([...tmp]); // 前序位置获得结果并返回

		for (let i = start; i < items.length; i += 1) {
			const cur = items[i];

			// * i > start 代表判断的是同层 后续
			// * items[i -1] 判断的是同层的上一个选中，因为同层的第一个默认选中（第一个肯定没有重复）
			if (i > start && cur === items[i - 1]) {
				continue;
			}

			tmp.push(cur); // 选择

			backtrack(nums, i + 1, tmp);
			tmp.pop(); // 撤销
		}
	}

	backtrack(nums.sort(), 0, []);
	return result;
}

/**
 * 全排列（交换元素优化版 ps：看不太懂版）
 */
function permute(nums: number[]) {
	const result: number[][] = [];

	function backtrack(arr: number[], start: number) {
		if (start === arr.length) {
			result.push(arr);
			return;
		}

		for (let i = start; i < arr.length; i++) {
			let newArr = [...arr];

			// 下层的递归会从 start + 1 开始，所以下层用于递归的数组，需要替换为start
			let t = newArr[start];
			newArr[start] = newArr[i];
			newArr[i] = t;

			backtrack(newArr, start + 1);
		}
	}

	backtrack(nums, 0);
	return result;
}
/**
 * 全排列（未优化，基本实现）
 */
function permute1(nums: number[]) {
	const result: number[][] = [];

	function backtrack(arr: number[], track: number[]) {
		if (track.length === arr.length) {
			result.push([...track]);
			return;
		}

		for (let i = 0; i < arr.length; i += 1) {
			const cur = arr[i];
			if (track.find((item) => item === cur) !== undefined) {
				continue;
			}

			track.push(cur);

			backtrack(arr, track);

			track.pop();
		}
	}

	backtrack(nums, []);

	return result;
}

/**
 * 组合
 * 找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合
 */
function combinationSum(candidates: number[], target: number): number[][] {
	const res: number[][] = [];
	candidates.sort(); // 排序方便减枝

	function backtrack(need: number, tmp: number[], canUse: number[]) {
		// 前序条件判断及结果返回
		if (need === 0) {
			res.push(tmp);
			return;
		}
		if (need < 0) {
			return;
		}

		for (let i = 0; i < canUse.length; i += 1) {
			if (canUse[i] > (target - tmp.reduce((a, b) => a + b, 0))) {
				continue;
			}
			need -= canUse[i];
			backtrack(need, tmp.concat(canUse[i]), canUse.slice(i));
			need += canUse[i];
		}
	}

	backtrack(target, [], candidates);
	return res;
}

/**
 * 77 组合
 * n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合
 */
function combine(n: number, k: number): number[][] {
	const result: ReturnType<typeof combine> = [];

	const forChoose: number[] = [];
	for (let i = 1; i <= n; i += 1) {
		forChoose.push(i);
	}

	function backtrack(items: number[], start: number, tmp: number[]) {
		// 获得需要的子集长度，该次递归可以结束直接返回
		if (tmp.length === k) {
			result.push([...tmp]);
			return;
		}

		for (let i = start; i < items.length; i += 1) {
			tmp.push(items[i]);

			// 增加 start 参数，从 i + 1 开始下一轮可以避免重复
			backtrack(items, i + 1, tmp);

			tmp.pop();
		}
	}

	backtrack(forChoose, 0, []);

	return result;
}

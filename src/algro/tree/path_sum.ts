/**
 * 437 路径总和
 * 
 * 递归
 */
function pathSum(root: TreeNode | null, targetSum: number): number {
	let count = 0;

	function re(node: TreeNode | null, nums: number[]) {
		if (!node) {
			return;
		}
		if (node.val === targetSum) {
			count += 1;
		}
		let next = [];
		for (let i = 0; i < nums.length; i += 1) {
			const cur = nums[i] + node.val;
			if (cur === targetSum) {
				count += 1;
			}
			next.push(cur);
		}
		next.push(node.val);

		re(node.right, next);
		re(node.left, next);
	}

	re(root, []);

	return count;
}
/**
 * 前缀和
 */
function pathSum1(root: TreeNode | null, targetSum: number) {
	if (!root) {
		return 0;
	}

	const map = new Map();
	// "1" 表示有一条前缀和为 0 的子路径
	map.set(0, 1);
	let ans = 0;
	function DFS(node: TreeNode, sum: number) {
		sum += node.val;

		// 如果有前缀和符合 sum - targetSum, 拿到此前缀和对应的子路径个数
		if (map.has(sum - targetSum)) {
			ans += map.get(sum - targetSum);
		}
		// 将此前缀和加入map，更新子路径个数
		map.set(sum, (map.get(sum) || 0) + 1);

		if (node.left) {
			DFS(node.left, sum);
		}
		if (node.right) {
			DFS(node.right, sum);
		}

		// 回溯，包含此节点的，前缀和为sum的路径个数 - 1
		map.set(sum, (map.get(sum) || 0) - 1);
	}
	DFS(root, 0);
	return ans;
}

/**
 * 重复的可能性不要重复计算
 */
// function pathSum1(root: TreeNode | null, targetSum: number): number {
// 	const all: number[][] = [];
// 	function DFS(node: TreeNode | null, tmp: number[]) {
// 		if (!node) {
// 			return;
// 		}
// 		if (node.left === null && node.right === null) {
// 			all.push(tmp.concat(node.val));
// 			return;
// 		}

// 		DFS(node.left, tmp.concat(node.val));
// 		DFS(node.right, tmp.concat(node.val));
// 	}

// 	DFS(root, []);

// 	let res = 0;
// 	all.forEach((i) => res += getTarNum(i, targetSum));

// 	return res;
// }
// function getTarNum(arr: number[], tar: number): number {
// 	let all = 0;

// 	function re(curArr: number[], res: number[]) {
// 		if (curArr.length === 0) {
// 			return;
// 		}
// 		const cur = curArr.pop()!;
// 		for (let c = 0; c < res.length; c += 1) {
// 			res[c] += cur;
// 			if (res[c] === tar) {
// 				all += 1;
// 			}
// 		}
// 		if (cur === tar) {
// 			all += 1;
// 		}
// 		res.push(cur);

// 		re(curArr, res);
// 	}
// 	re(arr, []);
// 	return all;
// }

const testTree11: TreeNode = {
	val: 10,
	left: {
		val: 5,
		left: {
			val: 3,
			left: { val: 3, left: null, right: null },
			right: { val: -2, left: null, right: null },
		},
		right: { val: 2, left: null, right: { val: 1, left: null, right: null } },
	},
	right: { val: -3, left: null, right: { val: 11, left: null, right: null } },
};

pathSum(testTree11, 8);

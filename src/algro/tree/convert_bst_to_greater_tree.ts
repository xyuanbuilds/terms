/**
 * 538/1038 二叉搜索树，整树中，比当前节点大的节点+当前节点的和
 * [*]
 * 
 * 由于二叉搜索树的性质，右 > 根 > 左，所以求 比当前节点大节点的累加，其实就是从右侧底部开始的中序过程中累加。
 */
function convertBST(root: TreeNode | null): TreeNode | null {
	let tmp = 0;
	function DFS(node: TreeNode | null) {
		if (!node) {
			return;
		}

		DFS(node.right);
		node.val += tmp;
		tmp = node.val;
		DFS(node.left);
	}
	DFS(root);
	return root;
}

function convertBSTNoRe(root: TreeNode | null): TreeNode | null {
	if (!root) {
		return root;
	}
	let tmp = 0;
	const stack: (TreeNode & { visited?: boolean } | null)[] = [root];

	while (stack.length > 0) {
		const node = stack.pop()!;
		if (!node) {
			continue;
		}
		if (!node.visited) {
			node.visited = true;
			stack.push(node.left, node, node.right);
		} else {
			node.val += tmp;
			tmp = node.val;
		}
	}

	return root;
}

const testTree: TreeNode = {
	val: 3,
	left: { val: 1, left: null, right: { val: 2, left: null, right: null } },
	right: {
		val: 5,
		left: { val: 4, left: null, right: null },
		right: { val: 8, left: null, right: null },
	},
};

convertBSTNoRe(testTree);
debugger;

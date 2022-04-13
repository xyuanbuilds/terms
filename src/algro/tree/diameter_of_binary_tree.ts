type TreeNode = { val: number, left: null | TreeNode, right: null | TreeNode };

/**
 * 543
 * 递归DFS
 */
export function diameterOfBinaryTree(root: TreeNode | null): number {
	if (!root) {
		return 0;
	}
	let max = 0;
	function DFS(node: TreeNode | null): number {
		if (!node) {
			return -1;
		}
		const l = !node.left ? 0 : DFS(node.left) + 1;
		const r = !node.right ? 0 : DFS(node.right) + 1;

		max = Math.max(max, l + r);
		return Math.max(l, r);
	}

	DFS(root);

	return max;
}

type TreeNode = { val: number, left: null | TreeNode, right: null | TreeNode };

/**
 * 617
 * 递归DFS
 */
export function mergeTrees(root1: TreeNode | null, root2: TreeNode | null):
	| TreeNode
	| null {
	if (!root1 || !root2) {
		return root1 || root2;
	}
	function DFS(left: TreeNode | null, right: TreeNode | null) {
		if (!left && !right) {
			return null;
		}

		const lv = left?.val ?? null;
		const rv = right?.val ?? null;

		// * 最简单交换
		let node: TreeNode = {
			val: lv && rv ? lv + rv : lv || rv!,
			left: null,
			right: null,
		};

		node.left = DFS(left?.left ?? null, right?.left ?? null);
		node.right = DFS(left?.right ?? null, right?.right ?? null);

		return node;
	}

	return DFS(root1, root2);
}

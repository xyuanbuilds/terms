function maxPathSum(root: TreeNode | null): number {
	if (!root) {
		return 0;
	}
	let max = root.val;

	function re(node: TreeNode | null): number {
		if (!node) {
			return Number.MIN_SAFE_INTEGER; // * 因为值有负数，所以null应该是最小数，不可为0（0会被判为大于负数，相当于被选择了）
		}
		const lMax = re(node.left);
		const rMax = re(node.right);

		max = Math.max(max, lMax + rMax + node.val, lMax, rMax);

		return Math.max(node.val, node.val + lMax, node.val + rMax);
	}

	return Math.max(re(root), max);
}

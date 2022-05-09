/**a
 * 99. 恢复二叉搜索树
 * [*]
 * 
 * * 二叉搜索树性质导致，中序遍历，一定是由小到大的
 * * 所以如果出现 pre >= cur 一定是错误的
 * * 且遇到的第一个错误位置是 pre
 * * 遇到的第二个错误位置是 cur
 * 
 * 中序遍历BST，依次访问的节点值是递增的，错误的BST会破坏递增性，从而能定位出错误。
 * * 中序遍历，回从最左端开始计算，所以如果有防越界元素，也是在最左端
 * * 由于是从左开始遍历，所以
 */
function recoverTree(root: TreeNode | null): void {
	let perv = new TreeNode(Number.MAX_SAFE_INTEGER);
	let err1: TreeNode | null = null;
	let err2: TreeNode | null = null;

	const inOrder = (root: TreeNode | null) => {
		if (root == null) {
			return;
		}
		inOrder(root.left);

		if (perv.val >= root.val && err1 == null) {
			// 当前是第一对错误
			err1 = perv; // 记录第一个错误点
		}
		if (perv.val >= root.val && err1 != null) {
			// 第一个错误点已确定
			err2 = root; // 记录第二个错误点

			[err1!.val, err2!.val] = [err2!.val, err1!.val];
			return;
		}
		perv = root; // 更新 perv

		inOrder(root.right);
	};

	inOrder(root);

	[err1!.val, err2!.val] = [err2!.val, err1!.val];
}

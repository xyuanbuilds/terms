/**
 * 105 从前序与中序遍历序列构造二叉树
 *
 * 中序，一般想到重点拆分再递归，分治
 */
function buildTree(preOrder: number[], inOrder: number[]): TreeNode | null {
  if (preOrder.length <= 1)
    return preOrder[0] ? { val: preOrder[0], left: null, right: null } : null;

  // * 前序的 0 就是中序列的 中心分割
  const root = preOrder[0];

  const rIndex = inOrder.findIndex((i) => i === root);
  // * 往左都是左子树
  const left = inOrder.slice(0, rIndex);
  // * 所以往右就都是 右子树
  const right = inOrder.slice(rIndex + 1);

  // * 然后递归
  const tree = {
    val: root,
    // * 左右子树长度前中序都是相同的
    left: buildTree(preOrder.slice(1, 1 + left.length), left),
    right: buildTree(preOrder.slice(1 + left.length), right),
  };

  return tree;
}

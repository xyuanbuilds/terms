/**a
 * 110. 平衡二叉树
 *
 * 类似 二叉树直径，也是要先判断，在返回偏大的结果
 */
function isBalanced(root: TreeNode | null): boolean {
  let res = true;
  function DFS(node: TreeNode | null): number {
    if (node === null) {
      return -1;
    }

    const hL = DFS(node.left) + 1;
    const hR = DFS(node.right) + 1;

    if (Math.abs(hL - hR) > 1) res = false;

    return hL > hR ? hL : hR;
  }

  DFS(root);

  return res;
}

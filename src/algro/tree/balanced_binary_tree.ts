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

function isBalanced1(root: TreeNode | null): boolean {
  if (!root) return true;

  let end = true;
  function dfs(node, res) {
    if (!node) return res;

    // * 前序记录
    res += 1;
    const l = dfs(node.left, res);
    const r = dfs(node.right, res);

    // * 后序判断
    if (Math.abs(l - r) > 1) end = false;
    return Math.max(l, r);
  }

  dfs(root, 0);
  return end;
}

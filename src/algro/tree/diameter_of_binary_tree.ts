type TreeNode = { val: number; left: null | TreeNode; right: null | TreeNode };

/**
 * 543
 * 二叉树的直径
 * [*]
 *
 * 也就是求最大 DFS 的值
 *
 * 后序 DFS
 */
export function diameterOfBinaryTree(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }
  let max = 0;

  function DFS(node: TreeNode): number {
    const l = !node.left ? 0 : DFS(node.left) + 1; // * 有效则加 1，无效直接返回 0
    const r = !node.right ? 0 : DFS(node.right) + 1;

    max = Math.max(max, l + r); // ! 某个节点的左右和，所以每个跟节点位置都要计算
    return Math.max(l, r); // ! 有节点的 DFS 返回值为 左 或 右 的一个有效值
  }

  DFS(root);

  return max;
}

// ! 不是 DFS 最大深度，是直径，是某个 节点左右 边长 和 的最大
function diameterOfBinaryTree1(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }
  let max = 0;
  function DFS(node: TreeNode | null, len: number) {
    if (!node) {
      return len;
    }

    len += 1;
    if (len > max) max = len;
    DFS(node.left, len);
    DFS(node.right, len);
  }

  DFS(root, -1);

  return max;
}

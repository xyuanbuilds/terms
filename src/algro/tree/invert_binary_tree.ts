/**
 * 翻转二叉树
 * @param root
 * @returns
 */
function invertTree(root: TreeNode) {
  function DFS(node: TreeNode | null) {
    if (!node) {
      return node;
    }

    // // * 最简单交换
    // let tmp = node.right;
    // node.right = node.left;
    // node.left = tmp;
    // DFS(node.left);
    // DFS(node.right);

    // * 次优
    // let t = node.right;
    // node.right = DFS(node.left);
    // node.left = DFS(t);

    // * 最优
    [node.right, node.left] = [DFS(node.left), DFS(node.right)];

    return node;
  }

  return DFS(root);
}

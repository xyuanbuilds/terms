/**
 * 04.06. 后继者
 *
 * * 中序遍历
 *
 */
function inorderSuccessor(root: TreeNode, p: TreeNode) {
  let willGet = false;
  let res: TreeNode | null = null;

  function dfs(node: TreeNode | null) {
    if (!node || res) return;

    dfs(node.left);

    if (willGet) {
      if (!res) res = node;
      return;
    }
    if (node === p) {
      willGet = true;
    }
    dfs(node.right);
  }
  dfs(root);

  return res;
}
function inorderSuccessor1(root: TreeNode, p: TreeNode) {
  let willGet = false;
  let res: TreeNode | null = null;

  function dfs(tree: TreeNode | null) {
    if (tree === null) return [];
    let stack: (TreeNode | null)[] = [tree];

    while (stack.length > 0) {
      let node = stack.pop()!;

      // * 节点存在左右，先推入，后续遍历为以访问节点时再做操作
      if (!node.visited && (node.right || node.left)) {
        const tmp = [node.right, node, node.left].filter((i) => !!i);
        node.visited = true;
        stack.push(...tmp);
      } else {
        if (willGet) {
          if (!res) res = node;
          return;
        }
        if (node === p) {
          willGet = true;
        }
      }
    }

    return res;
  }
  dfs(root);

  return res;
}

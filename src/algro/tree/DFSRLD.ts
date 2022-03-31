import { isStackNonEmpty } from "./DFS";
import type { TreeNode } from "./DFS";

interface BinaryTreeNode extends TreeNode {
  left: BinaryTreeNode | null;
  right: BinaryTreeNode | null;
  visited?: boolean;
}

const isBinaryTreeNode = (i: unknown): i is BinaryTreeNode => i !== null;

/**
 * 后序需要将 父节点放在最后，所以肯定是先推入栈，再做操作（先序是先做操作）
 */
function DFS_RLD(tree: BinaryTreeNode | null, res: any[] = []) {
  if (tree === null) return [];
  let stack = [tree];

  while (isStackNonEmpty(stack)) {
    let node = stack.pop();

    // * 节点存在左右，先推入，后续遍历为以访问节点时再做操作
    if (!node.visited && (node.right || node.left)) {
      // * 后序 与 中序 的唯一区别就是，中序将 node 放在了中间
      const tmp = [node, node.right, node.left].filter(isBinaryTreeNode);
      node.visited = true;
      stack.push(...tmp);
    } else {
      /* 做一些事情，可完成后退出 */
      res.push(node.value);
    }
  }

  return res;
}

function ReDFS_RLD(node: BinaryTreeNode | null, res: any[] = []) {
  if (!node) return;

  ReDFS_RLD(node.left, res);
  ReDFS_RLD(node.right, res);
  res.push(node.value);
  return res;
}

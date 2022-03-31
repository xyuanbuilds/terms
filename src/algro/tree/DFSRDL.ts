import { isStackNonEmpty } from "./DFS";
import type { TreeNode } from "./DFS";

interface BinaryTreeNode extends TreeNode {
  left: BinaryTreeNode | null;
  right: BinaryTreeNode | null;
  visited?: boolean;
}

const isBinaryTreeNode = (i: unknown): i is BinaryTreeNode => i !== null;

/**
 * 由于需要确认中点，中序使用二叉树
 *
 * 中序需要将 父节点夹在中间，所以肯定是先推入栈，再做操作（先序是先做操作）
 */
function DFS_RDL(tree: BinaryTreeNode | null, res: any[] = []) {
  if (tree === null) return [];
  let stack = [tree];

  while (isStackNonEmpty(stack)) {
    let node = stack.pop();

    // * 节点存在左右，先推入，后续遍历为以访问节点时再做操作
    if (!node.visited && (node.right || node.left)) {
      const tmp = [node.right, node, node.left].filter(isBinaryTreeNode);
      node.visited = true;
      stack.push(...tmp);
    } else {
      /* 做一些事情，可完成后退出 */
      res.push(node.value);
    }
  }

  return res;
}

function ReDFS_RDL(node: BinaryTreeNode | null, res: any[] = []) {
  if (!node) return;

  ReDFS_RDL(node.left, res);
  res.push(node.value);
  ReDFS_RDL(node.right, res);

  return res;
}

// interface BinaryTreeNode {
//   val: number;
//   left: BinaryTreeNode | null;
//   right: BinaryTreeNode | null;
//   visited?: boolean;
// }

// interface NonEmptyArray<A> extends Array<A> {
//   0: A;
//   pop(): A;
// }

// const isBinaryTreeNodeValid = (i: BinaryTreeNode | null): i is BinaryTreeNode =>
//   i !== null;

// const isStackNonEmpty = <T extends unknown>(a: T[]): a is NonEmptyArray<T> =>
//   a && a.length > 0;

// function inorderTraversal(tree: BinaryTreeNode) {
//   if (tree === null) return [];
//   let stack = [tree];
//   const res = [];
//   while (isStackNonEmpty(stack)) {
//     let node = stack.pop();

//     if (!node.visited && (node.right || node.left)) {
//       const tmp = [node.right, node, node.left].filter(isBinaryTreeNodeValid);
//       node.visited = true;
//       stack.push(...tmp);
//     } else {
//       /* 做一些事情，可完成后退出*/
//       res.push(node.val);
//     }
//   }

//   return res;
// }

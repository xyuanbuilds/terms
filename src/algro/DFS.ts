type TreeNode = {
  value: any;
  children: TreeNode[];
};

const isTree = (
  node: TreeNode
): node is TreeNode & {
  children: NonEmptyArray<TreeNode>;
} => node.children && node.children.length > 0;

const isStackNonEmpty = <T extends unknown>(a: T[]): a is NonEmptyArray<T> =>
  a && a.length > 0;

function DFS(tree: TreeNode, target: any) {
  // 模拟栈，管理结点
  let stack = [tree];
  while (isStackNonEmpty(stack)) {
    // 栈顶节点出栈
    let node = stack.pop();
    /* 做一些事情，可完成后退出*/
    if (node.value === target) {
      return target;
    }
    /**/
    if (isTree(node)) {
      // 将候选顶点入栈，进行下一次循环
      // 如果需要从左往右，则需要 reverse，按需求进行操作
      stack.push(...node.children.reverse());
      // 当前会先遍历右子树
      // stack.push(...node.children);
    }
  }
}

function ReDFS(node: TreeNode | undefined, target: any) {
  if (!node) return;

  /* 前序 做一些事情，可完成后退出*/
  if (node.value === target) {
    return target;
  }

  for (let i = 0; i < node.children.length; i++) {
    ReDFS(node.children[i], target);
  }
}

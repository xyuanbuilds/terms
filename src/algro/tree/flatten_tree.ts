/**
 * 114. 二叉树展开为链表
 *
 * @param root
 * @returns
 */
export function flatten(root: TreeNode | null): void {
  if (!root) return;

  let tmp: TreeNode = {
    val: 0,
    right: null,
    left: null,
  };
  let p = tmp;
  function DFS(node: TreeNode | null) {
    if (!node) return;

    p.right = {
      val: node.val,
      left: null,
      right: null,
    };
    p = p.right;

    DFS(node.left);
    DFS(node.right);
  }

  DFS(root.left);

  const l: TreeNode | null = tmp.right;
  tmp = {
    val: 0,
    right: null,
    left: null,
  };
  p = tmp;
  DFS(root.right);
  const r: TreeNode | null = tmp.right;

  if (l === null) {
    root.right = r;
    return;
  }

  root.right = l;

  let cur: TreeNode | null = root.right;
  while (cur) {
    if (cur.right === null) {
      cur.right = r;
      break;
    }
    cur = cur.right;
  }
  root.left = null;
}

const test2 = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: {
      val: 4,
      left: null,
      right: null,
    },
  },
  right: {
    val: 5,
    left: null,
    right: {
      val: 6,
      left: null,
      right: null,
    },
  },
};

flatten(test2);

debugger;

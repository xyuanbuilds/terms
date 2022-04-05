import { isStackNonEmpty as isNonEmpty } from "./DFS";
import type { BinaryTreeNode } from "./DFSRDL";

function levelOrder(root: BinaryTreeNode | null): number[][] {
  if (!root) return [];

  const res: number[][] = [];
  let tmp: number[] = [];
  const queue: BinaryTreeNode[] = [root];

  while (isNonEmpty(queue)) {
    let l = queue.length;

    for (let o = 0; o < l; o += 1) {
      const cur = queue.shift();

      if (cur.left) queue.push(cur.left);
      if (cur.right) queue.push(cur.right);

      tmp.push(cur.value);
    }
    res.push(tmp);
    tmp = [];
  }

  return res;
}

// [3,9,20,null,null,15,7]

const test = {
  value: 3,
  left: {
    value: 9,
    left: null,
    right: null,
  },
  right: {
    value: 20,
    left: {
      value: 15,
      left: null,
      right: null,
    },
    right: {
      value: 7,
      left: null,
      right: null,
    },
  },
};

// const res = levelOrder(test);

/**
 * 236 二叉树公共父节点
 *
 * * 最近公共父节点，是在找两个节点的回溯期双方第一个重复的节点（利用set）
 * ! 由于结果可能是需要寻找的节点 p 和 q，所以target === root 验证也需要在回溯期，或不能匹配后直接跳出
 *
 * 理论可行，但超时了
 */
function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  if (root == null) {
    return null;
  }
  if (root === q || root === p) {
    return root;
  }

  let pVisited = false;
  let qVisited = false;
  let pParents: TreeNode[] = [];
  let qParents: TreeNode[] = [];
  function DFS(node: TreeNode | null, tmp: TreeNode[]) {
    if ((pVisited && qVisited) || !node) {
      return;
    }

    tmp.push(node);

    if (node === p) {
      pVisited = true;
      pParents = [...tmp];
    }
    if (node === q) {
      qVisited = true;
      qParents = [...tmp];
    }

    DFS(node.left, [...tmp]);
    DFS(node.right, [...tmp]);
  }

  DFS(root, []);

  let res = null;
  const limit = Math.max(pParents.length, qParents.length);
  for (let i = 0; i < limit; i += 1) {
    if (pParents[i] === qParents[i]) {
      res = pParents[i];
    } else {
      return res;
    }
  }
  return res;
}

/**
 * set 记录
 */
function lowestCommonAncestor2(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
) {
  const pSet: Set<TreeNode> = new Set();
  let find = false;
  let res: TreeNode | null = null;

  function DFS(root: TreeNode | null, target: TreeNode | null) {
    if ((root?.left ?? null) != null && root != target && find == false) {
      DFS(root!.left, target);
    }
    if ((root?.right ?? null) != null && root != target && find == false) {
      DFS(root!.right, target);
    }

    // 找到目标节点
    if (root == target) {
      find = true;
    }

    // ! 回溯过程中，最先重复的，则为最近
    if (find && root) {
      if (pSet.has(root)) {
        // 第一个重复的节点即为最近公共祖先
        if (res === null) {
          res = root;
        }
      } else {
        // 将目标节点到根节点的路径上的所有节点加入到set
        pSet.add(root);
      }
      return;
    }
  }

  DFS(root, p);
  find = false;
  DFS(root, q);

  return res;
}

/**
 * 纯递归
 */
function lowestCommonAncestor1(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  if (root == null) {
    return null;
  }
  if (root === q || root === p) {
    return root;
  }
  // 非null 非q 非p，则递归左右子树
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left && right) {
    return root; // ! 后序，最后一个能同时获取 left 和 right 的就为最近公共父节点
  }

  return left || right;
}
// const testTree: TreeNode = {
// 	val: 3,
// 	left: {
// 		val: 5,
// 		left: { val: 6, left: null, right: null },
// 		right: {
// 			val: 2,
// 			left: { val: 7, left: null, right: null },
// 			right: { val: 4, left: null, right: null },
// 		},
// 	},
// 	right: {
// 		val: 1,
// 		left: { val: 0, left: null, right: null },
// 		right: { val: 8, left: null, right: null },
// 	},
// };
// const res = lowestCommonAncestor1(
// 	testTree,
// 	testTree.left,
// 	testTree.left!.right!.right,
// );

// 复习
function lowestCommonAncestorAA(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  const cache: Set<TreeNode> = new Set();
  let found = false;
  let res: TreeNode | null = null;

  function DFS(root: TreeNode | null, target: TreeNode | null) {
    if (found || !root) return;

    DFS(root.left, target);
    DFS(root.right, target);

    // 找到目标节点
    if (root == target) {
      found = true;
    }

    // ! 回溯过程中，最先重复的，则为最近
    if (found) {
      if (cache.has(root) && res === null) {
        res = root;
        return;
      } else {
        cache.add(root); // * 已有内容的记录在回溯期
      }
    }
  }

  DFS(root, p);
  found = false;
  DFS(root, q);

  return res;
}

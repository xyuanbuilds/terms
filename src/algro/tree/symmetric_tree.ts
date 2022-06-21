/**
 * 101. 对称二叉树
 */
function isSymmetric(root: TreeNode | null): boolean {
  if (!root) {
    return false;
  }
  function ReDFS_RDL(
    node: TreeNode | null,
    res: any[] = [],
    reverse?: boolean
  ) {
    if (node === null) {
      res.push(null);
      return;
    }

    res.push(node.val);

    ReDFS_RDL(reverse ? node.left : node.right, res, reverse);
    ReDFS_RDL(reverse ? node.right : node.left, res, reverse);

    return res;
  }

  const l: TreeNode[] = [];
  const r: TreeNode[] = [];

  ReDFS_RDL(root.left, l);

  ReDFS_RDL(root.right, r, true);

  return l.every((i, index) => i === r[index]);
}
// const test1 = {
//   val: 2,
//   left: {
//     val: 3,
//     left: {
//       val: 4,
//       left: null,
//       right: null,
//     },
//     right: {
//       val: 5,
//       left: {
//         val: 8,
//         left: null,
//         right: null,
//       },
//       right: {
//         val: 9,
//         left: null,
//         right: null,
//       },
//     },
//   },
//   right: {
//     val: 3,
//     left: {
//       val: 5,
//       left: {
//         val: 9,
//         left: null,
//         right: null,
//       },
//       right: {
//         val: 8,
//         left: null,
//         right: null,
//       },
//     },
//     right: {
//       val: 4,
//       left: null,
//       right: null,
//     },
//   },
// };

// const res = isSymmetric(test1);
function isSymmetric1(root: TreeNode | null): boolean {
  if (!root) return true;

  function dfs(node, tmp, dir) {
    if (!node) return `null${tmp}`;
    const l = dfs(node.left, tmp + node.val, dir);
    const r = dfs(node.right, tmp + node.val, dir);
    if (dir === "l") {
      return `${l}${tmp}${r}`;
    } else {
      return `${r}${tmp}${l}`;
    }
  }

  const l = dfs(root.left, "", "l");
  const r = dfs(root.right, "", "r");

  return l === r;
}

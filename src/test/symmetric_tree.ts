/**
 * 101
 */
function isSymmetric(root: TreeNode | null): boolean {
  if (!root) return false;
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

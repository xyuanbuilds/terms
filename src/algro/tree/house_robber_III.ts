/**
 * 337 打家劫舍 3
 * [*]
 *
 * 树动态规划
 * 树的动态规划需要用递归进行思考，因为得 **先处理父再处理子**，递归后，在后序位置进行判断
 *
 * 无后效性：父节点是否选择，不影响子节点的是否选择
 */
function rob(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }

  let money = root.val;
  if (root.left != null) {
    money += rob(root.left.left) + rob(root.left.right);
  }

  if (root.right != null) {
    money += rob(root.right.left) + rob(root.right.right);
  }
  return Math.max(money, rob(root.left) + rob(root.right));
}

function robDP(root: TreeNode | null): number {
  const memo: Map<TreeNode, number> = new Map();

  function robRe(root: TreeNode | null): number {
    if (!root) {
      return 0;
    }
    //* 返回已经计算过的节点信息
    if (memo.has(root)) {
      return memo.get(root)!;
    }

    // * 假设当前节点偷， 那 left 和 right 就不能偷了，只能偷
    // * left.left + left.right 和 right.left + right.right
    // let money = root.val;
    // if (root.left != null) {
    //   money += robRe(root.left.left) + robRe(root.left.right);
    // }
    // if (root.right != null) {
    //   money += robRe(root.right.left) + robRe(root.right.right);
    // }
    //* 之后比较这两种方式哪种偷得多
    const res = Math.max(
      root.val +
        (root.left ? robRe(root.left.left) + robRe(root.left.right) : 0) +
        (root.right ? robRe(root.right.left) + robRe(root.right.right) : 0),
      robRe(root.left) + robRe(root.right)
    );

    memo.set(root, res);

    return res;
  }

  return robRe(root);
}
function robDP2(root: TreeNode | null): number {
  function robRe(root: TreeNode | null): [number, number] {
    if (!root) {
      return [0, 0]; // [当前节点偷，当前节点不偷]
    }
    const res: [number, number] = [0, 0];

    const left = robRe(root.left);
    const right = robRe(root.right);

    // ! 后序位置计算
    // * 当前节点选择不偷：当前节点最大 = 左能偷到的钱（左可偷可不偷） + 右能偷到的钱（右可偷可不偷）
    res[0] = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);

    // * 当前节点选择偷：左不偷 + 右不偷
    res[1] = left[0] + right[0] + root.val;

    return res;
  }

  return Math.max(...robRe(root));
}

const testTree1: TreeNode = {
  val: 3,
  left: { val: 1, left: null, right: { val: 2, left: null, right: null } },
  right: {
    val: 5,
    left: { val: 4, left: null, right: null },
    right: { val: 8, left: null, right: null },
  },
};
const testTree2: TreeNode = {
  val: 2,
  left: { val: 1, left: null, right: { val: 4, left: null, right: null } },
  right: { val: 3, left: null, right: null },
};

const r = robDP(testTree2);
debugger;

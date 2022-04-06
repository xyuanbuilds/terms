/**
 * 可递归、可DP
 * unique-binary-search-trees-ii
 *
 * 一颗二叉树 = 所包含元素的组合 = start -> end
 *
 * 递归的参数数目 = DP表的维度
 * 通过递归实现可以发现，如果使用 DP，需要二维矩阵 `dp[start][end]`
 */

/**
 * 递归
 */
function generateTrees(n: number) {
  if (n < 1) {
    return [];
  }
  const memo = {};
  return getAns(1, n);
  function getAns(start: number, end: number) {
    if (memo[`${start}_${end}`]) return memo[`${start}_${end}`];

    const list = [];

    if (start > end) {
      list.push(null);
      return list;
    }

    for (let i = start; i <= end; i++) {
      let lefts = getAns(start, i - 1);
      let rights = getAns(i + 1, end);

      for (let l of lefts) {
        for (let r of rights) {
          let root = new TreeNode(i);
          root.left = l;
          root.right = r;
          list.push(root);
        }
      }
    }

    memo[`${start}_${end}`];

    return list;
  }
}

/**
 * DP
 */
function generateTreesDP(n: number) {
  const dp: TreeNode[][][] = [...Array(9)].map(() => []); //

  function dfs(i: number, j: number): TreeNode[] | null[] {
    if (Array.isArray(dp[i]?.[j])) {
      return dp[i][j];
    }

    if (j < i) {
      return [null];
    }

    const list: TreeNode[] = [];
    if (i == j) {
      list.push(new TreeNode(i));
      dp[i][j] = list;
      return dp[i][j];
    }
    for (let k = i; k <= j; k += 1) {
      const left = dfs(i, k - 1);
      const right = dfs(k + 1, j);

      for (let l of left) {
        for (let r of right) {
          let root = new TreeNode(k);
          root.left = l;
          root.right = r;
          list.push(root);
        }
      }
    }
    dp[i][j] = list;
    return dp[i][j];
  }

  return dfs(1, n);
}

// type TreeNode = {
//   val: number;
//   left: null | TreeNode;
//   right: null | TreeNode;
// };
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// const res = generateTrees(3);

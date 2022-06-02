/**
 * 22 括号生成
 * [*]
 *
 * * 括号的性质，必须要掌握
 *
 * * DFS + 回溯
 *
 * * 当前左右括号都有大于 0 个可以使用的时候，才产生分支；left > 0 && right > 0
 * * 生成左括号，只看当前是否还有左括号可以使用；left > 0
 * * 生成右括号，受到左括号的限制，右剩余可以使用的括号数量一定得在严格大于左边剩余的数量，才可以生成右括号；left < right
 * 在左边和右边剩余的括号数都等于 0 的时候结算。
 *
 * https://leetcode-cn.com/problems/generate-parentheses/solution/hui-su-suan-fa-by-liweiwei1419/
 *
 */
// * n 表示有 n 对括号，n 个 左，n 个 右
function generateParenthesis(n: number) {
  const res: string[] = [];

  if (n === 0) {
    return res;
  }

  dfs([], n, n, res);
  return res;
}

/**
 *
 * @param path 结果存储数组
 * @param left 剩余left
 * @param right 剩余right
 * @param res 结果数组
 * @returns
 */
function dfs(path: string[], left: number, right: number, res: string[]) {
  if (left == 0 && right == 0) {
    res.push(path.join(""));
    return;
  }

  // * 左括号大于右括号，不处理该结果
  // * 左括号可用应该小于或等于右括号
  // ! 也就是右侧括号不能提前添加，必须有左侧括号先添加过了才行
  // 所以剩余 left 大于剩余right
  if (left > right) {
    return;
  }

  if (left > 0) {
    path.push("(");
    dfs(path, left - 1, right, res);
    path.pop();
  }
  if (right > 0) {
    path.push(")");
    dfs(path, left, right - 1, res);
    path.pop();
  }
}

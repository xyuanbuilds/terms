/**a
 *  杨辉三角
 */
function generate(numRows: number): number[][] {
  if (numRows === 2) {
    return [[1], [1, 1]];
  }
  if (numRows === 1) {
    return [[1]];
  }

  if (numRows === 3) return [[1], [1, 1], [1, 2, 1]];

  const dp = Array(numRows)
    .fill(1)
    .map((_, index) => Array(index + 1).fill(1));

  for (let i = 2; i < numRows; i += 1) {
    for (let j = 1; j < i; j += 1) {
      dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
    }
  }

  return dp;
}
generate(5);

/**
 * 119 杨辉三角 2
 */
function getRow(rowIndex: number): number[] {
  if (rowIndex === 0) return [1];
  if (rowIndex === 1) return [1, 1];
  let pre = [1, 1];
  let res: number[] = [];
  for (let i = 2; i <= rowIndex; i += 1) {
    for (let j = 0; j <= i; j += 1) {
      if (j === 0 || j === i) {
        res[j] = 1;
      } else {
        res[j] = pre[j - 1] + pre[j];
      }
    }
    pre = res;
    res = [];
  }
  console.log(pre);
  return pre;
}
getRow(4);

// 输入: numRows = 5;
// 输出: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]];

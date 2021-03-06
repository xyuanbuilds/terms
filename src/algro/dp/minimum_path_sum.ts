/**
 * 64 最小路径和
 * [*]
 *
 * * 注意不可以取值的边界
 * * 结果可以直接记录在 grid 中
 *
 * 给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
 * 说明：每次只能向下或者向右移动一步。
 *
 * 网格动态规划，基础的动态规划题，考虑好边界即可
 */
function minPathSum(grid: number[][]): number {
  const x = grid.length;
  const y = grid[0].length;

  for (let i = 0; i < x; ++i) {
    for (let j = 0; j < y; ++j) {
      if (i - 1 >= 0 && j - 1 >= 0) {
        //* 左边和上方都可以取
        grid[i][j] = Math.min(grid[i - 1][j], grid[i][j - 1]) + grid[i][j];
      } else if (i === 0 && j === 0) {
        //* 第一格不需要，grid[0][0] 是多少就是多少
        continue;
        //* 只有其中一边可以取
      } else if (i === 0) {
        grid[i][j] = grid[i][j - 1] + grid[i][j];
      } else {
        grid[i][j] = grid[i - 1][j] + grid[i][j];
      }
    }
  }
  return grid[x - 1][y - 1];
}
// const res = minPathSum([[1, 2, 3], [4, 5, 6]]);
// debugger;

function minPathSum1(grid: number[][]) {
  const m = grid.length;
  const n = grid[0].length;
  const f = Array(m)
    .fill(0)
    .map(() => Array(n).fill(0));
  const g = Array(m * n);
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (i == m - 1 && j == n - 1) {
        f[i][j] = grid[i][j];
      } else {
        let bottom = i + 1 < m ? f[i + 1][j] + grid[i][j] : Number.MAX_VALUE;
        let right = j + 1 < n ? f[i][j + 1] + grid[i][j] : Number.MAX_VALUE;
        f[i][j] = Math.min(bottom, right);
      }
    }
  }

  return f[0][0];
}
// const res = minPathSum1=([[1, 2, 3], [4, 5, 6]]);

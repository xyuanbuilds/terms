/**
 * 452. 用最少数量的箭引爆气球
 *
 * @param points
 */
function findMinArrowShots(points: number[][]): number {
  points.sort((a, b) => a[1] - b[1]);

  let nums = 1;
  let pre = points[0][1];

  for (let [l, r] of points) {
    if (l > pre) {
      // * 前一支箭能不能击穿当前的
      nums += 1; // 不能加一支
      pre = r; // * 扎破的最右边的
    }
  }

  return nums;
}
// 输入：points = [[10,16],[2,8],[1,6],[7,12]]
// 输出：2
// 解释：气球可以用2支箭来爆破:
// -在x = 6处射出箭，击破气球[2,8]和[1,6]。
// -在x = 11处发射箭，击破气球[10,16]和[7,12]

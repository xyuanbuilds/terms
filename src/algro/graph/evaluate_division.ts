/**
 * 399. 除法求值
 *
 * * 图
 *
 * 作者：佐佐木绯世
 * 链接：https://leetcode.cn/problems/evaluate-division/solutions/548073/js-lin-jie-biao-dfs-by-yleave-l8p5/
 *
 * 图关系建立及邻接表
 *
 * a / b = 2 -> b / a = 1 / 2
 * b / c = 3 -> c / b = 1 / 3
 *
 *
 *
 * (a / b) * (b / c) = a / c = 2 * 3 = 6
 *
 * 所以存在邻接关系（ a 和 c 都邻接 b），就能计算出相隔的值
 *
 * Map(3) {
 *  'a' => [ [ 'b', 2 ] ],
 *  'b' => [ [ 'a', 0.5 ], [ 'c', 3 ] ],
 *  'c' => [ [ 'b', 0.3333333333333333 ] ]
 * }
 */
const calcEquation = (
  equations: string[][],
  values: number[],
  queries: string[][]
) => {
  let map = new Map(),
    res = [];
  let visit = new Map(); // visit 数组标记在搜索过程中是否访问过

  const dfs = (src: string, dst: string): number => {
    // 若可达，且找到了目的节点，返回 1.0 表示成功到达
    if (src === dst) {
      return 1.0;
    }

    let adjacencies = map.get(src);

    // 遍历 src 的所有边，若未访问过，则对其调用 dfs 获取路径积
    for (let i = 0; i < adjacencies.length; i += 1) {
      let next = adjacencies[i];
      if (!visit.get(next[0])) {
        visit.set(next[0], true);

        const ret = dfs(next[0], dst);

        visit.set(next[0], false);
        // 若可达 dst，则返回当前边权与后续的边权积 ret 的乘积
        if (ret !== -1.0) {
          return next[1] * ret;
        }
      }
    }

    // 否则，不可达，返回 -1.0
    return -1.0;
  };

  // 创建邻接表
  for (let i = 0; i < equations.length; i += 1) {
    let e = equations[i],
      v = values[i];

    if (!map.has(e[0])) {
      map.set(e[0], []);
      visit.set(e[0], false);
    }
    if (!map.has(e[1])) {
      map.set(e[1], []);
      visit.set(e[1], false);
    }

    let adj1 = map.get(e[0]);
    let adj2 = map.get(e[1]);
    adj1.push([e[1], v]);
    adj2.push([e[0], 1 / v]);
  }

  for (const q of queries) {
    const n0 = q[0],
      n1 = q[1];
    if (map.has(n0) && map.has(n1)) {
      visit.set(n0, true);
      res.push(dfs(n0, n1));
      visit.set(n0, false);
    } else {
      res.push(-1.0);
    }
  }

  return res;
};

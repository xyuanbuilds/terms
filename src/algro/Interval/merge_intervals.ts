/**
 * 56 合并区间
 * [*]
 *
 * 滑动窗口
 */
function merge(intervals: number[][]): number[][] {
  intervals.sort((v1, v2) => v1[0] - v2[0]); // * 左边界排序

  const res = Array(intervals.length)
    .fill(0)
    .map(() => [...Array(2)]);

  let idx = 0; // * 结果 index 从 0 开始，
  for (let interval of intervals) {
    // * 或者当前区间 l > 结果数组中最后区间的r，需要合并
    // * 数组是空的，或 左 > prev右 与上一个区间没有交集，直接放入当前结果
    if (idx === 0 || interval[0] > res[idx - 1][1]) {
      // * 从 0 开始放，放一个加一个
      res[idx] = interval;
      idx += 1;
    } else {
      // * 做合并操作，直接修改上一个的右边界
      // * 和入上一个区间
      // * 也有可能被上一个区间包围
      res[idx - 1][1] = Math.max(res[idx - 1][1], interval[1]);
    }
  }

  return res.slice(0, idx);
}

const res = merge([
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
]);
console.log(res);

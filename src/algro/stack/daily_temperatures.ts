/**
 * 739. 每日温度
 *
 * * 单调栈
 *
 * 给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，
 * 其中 answer[i] 是指对于第 i 天，下一个更高温度出现在几天后。
 * 如果气温在这之后都不会升高，请在该位置用 0 来代替。
 *
 * 关键: 下一个大的 -> 遍历 -> 遇到大的计算结果
 *                       -> 遇到小的 等待
 *                          -> 因为越小的值必然优先得到结果，所以使用 单调（递减）栈 做等待存放
 */

function dailyTemperatures(temperatures: number[]): number[] {
  const stack: number[][] = [];
  const res = Array(temperatures.length).fill(0);

  /** 从左到右遍历，先对比后压栈 */
  for (let index = 0; index < temperatures.length; index += 1) {
    const cur = temperatures[index];

    /** 要计算的结果为，元素距离比它大的元素的距离 */
    /** 所以要记录当前元素索引index，遇到 大于它的元素获取值 */
    /** 遇到比它小的，则压入堆栈，因为比它小的会更快找到目标，所以在栈顶 */
    /** 所以堆栈为单调递减（堆栈顶最小，堆栈底最大） */
    /** 当前元素对比栈顶， 如果当前元素更大，则说明栈顶的元素 找到结果 */
    /** 栈顶元素出栈，继续比较栈顶，如果当前元素小了，则压栈不再比较，大了则重复上述操作 */
    /** 栈为空则直接压栈 */
    while (stack.length > 0) {
      const top = stack[stack.length - 1];
      if (top[0] < cur) {
        res[top[1]] = index - top[1];
        stack.pop();
      } else {
        break;
      }
    }

    stack.push([temperatures[index], index]);
  }

  return res;
}

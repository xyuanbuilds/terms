/**
 * 621. 任务调度器
 *
 */
function leastInterval(tasks: string[], n: number): number {
  if (n == 0) {
    return tasks.length;
  }

  const vMap: Record<string, number> = {};

  for (const v of tasks) {
    if (vMap[v]) {
      vMap[v] += 1;
    } else {
      vMap[v] = 1;
    }
  }

  let max = 0;
  let maxCount = 0;

  Object.entries(vMap).forEach(([_, value]) => {
    if (value > max) {
      max = value;
      maxCount = 1;
    } else if (value === max) {
      maxCount += 1;
    }
  });

  Object.values(vMap).forEach((value) => {
    if (value > max) {
      max = value;
      maxCount = 1;
    } else if (value === max) {
      maxCount += 1;
    }
  });

  /**
   * max 为任务数最多的 任务
   * maxCount 为它的任务数
   *
   * 因为存在待定，至少需要 max - 1 * n + 1 的矩阵时间，然后 + 剩余的最多数的任务
   * 因为连续不同的任务可以填满任务头的待定时间 这个任务头 + 待定是如果要完成所有的 max 任务，肯定需要间隔的 n + 1 时间
   * 然后在等待 max 任务的间隔，可以穿插别的任务，任务都穿插完后，只能默认待定
   * * 同为 maxCount 的任务再上面的固定耗时后，会在他们的最后一次任务时消耗 maxCount 的时间（只剩他们需要执行）
   *
   * A B C D
   * A B C D
   * A B C x
   * A B
   *
   * 如这个例子，A、B 为max任务，他们的耗时是必然固定的
   *
   * 然后也存在完全不需要待定情况，这时候就不需要在意最长任务了
   *
   * */
  return Math.max((max - 1) * (n + 1) + maxCount, tasks.length);
}

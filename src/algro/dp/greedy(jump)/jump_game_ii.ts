/**
 * 45 跳跃游戏 2
 * [*]
 *
 * 记录结算点位
 */
function jump(nums: number[]): number {
  let curEnd = 0; // ! 从 0 开始
  let farest = nums[0];
  let step = 0; // ! 从 0 开始

  for (let i = 0; i < nums.length - 1; i += 1) {
    // ! 走到末尾，不是走出，所以 < nums.length - 1
    const canJump = nums[i];
    // * 获取当前位置能走到的最远 index
    farest = Math.max(canJump + i, farest);

    // * 最远已经跳出，直接返回结果
    if (farest >= nums.length - 1) {
      return step + 1;
    }

    // * 到达上一步能走的最远的位置
    // * 必须要在前面可走的选择中选一个走一步
    // * 选能走的，且走得最远的
    if (curEnd === i) {
      // * 必须要走一步，才能继续往后走
      step += 1;

      // * 记录下一次的结算点位
      curEnd = farest;
    }
  }
  return step;
}

export { jump };

/**
 * 496. 下一个更大元素 I
 * [*]
 *
 * 单调栈
 * https://leetcode.cn/problems/next-greater-element-i/solution/dan-diao-zhan-jie-jue-next-greater-number-yi-lei-w/
 * @param nums1
 * @param nums2
 */
function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
  const resMap = new Map();
  nums1.forEach((k) => resMap.set(k, -1));

  const stack: number[] = [];
  // * 倒着往栈里放
  for (let i = nums2.length - 1; i >= 0; i--) {
    // * 栈顶的小了，不需要了
    while (stack.length !== 0 && stack[stack.length - 1] <= nums2[i]) {
      stack.pop(); // 矮个起开，反正也被挡着了。。。
    }
    if (resMap.has(nums2[i])) {
      // * 由于从后开始的，经了上方的去顶，堆栈顶的就是恰好大于当前元素的
      resMap.set(nums2[i], stack.length === 0 ? -1 : stack[stack.length - 1]);
    }
    // *当前元素入栈，用于左侧元素判断匹配
    stack.push(nums2[i]); // 进队，接受之后的身高判定吧！
  }

  const res: number[] = [];
  resMap.forEach((k) => {
    res.push(k);
  });
  return res;
}
// 输入：nums1 = [2,4], nums2 = [1,2,3,4].
// 输出：[3,-1]
// 解释：nums1 中每个值的下一个更大元素如下所述：
// - 2 ，用加粗斜体标识，nums2 = [1,2,3,4]。下一个更大元素是 3 。
// - 4 ，用加粗斜体标识，nums2 = [1,2,3,4]。不存在下一个更大元素，所以答案是 -1

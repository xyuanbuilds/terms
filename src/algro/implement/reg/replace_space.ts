/**
 * 剑指 Offer 05. 替换空格
 *
 * 此处可以有双指针思考
 * https://leetcode.cn/problems/ti-huan-kong-ge-lcof/solution/tu-jie-guan-fang-tui-jian-ti-jie-ti-huan-3l74/
 * 从后往前遍历
 *
 * @param s
 */
function replaceSpace(s: string): string {
  return s.replace(/\s/g, "%20");
}

// 输入：s = "We are happy."
// 输出："We%20are%20happy."

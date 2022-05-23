/**
 * 424. 替换后的最长重复字符
 *
 * 滑动窗口
 * @param s
 * @param k
 */
function characterReplacement(s: string, k: number): number {
  const len = s.length;
  if (len === 1) return 1;

  let l = 0;
  let r = 0;

  let max = 0;
  const codes = Array(26).fill(0);
  const h = "A".charCodeAt(0);

  // * 滚动窗口, r -> len
  while (r < len) {
    const curIndex = s[r].charCodeAt(0) - h;
    codes[curIndex] += 1;

    max = Math.max(max, codes[curIndex]);
    // * r - l - 1: 窗口包含数量
    // * - max 获得需要转化的字符数
    // * 如果 k 不够 需要转化数，说明需要缩小窗口了
    // * l += 1，继续以上一次 r +1 前的窗口来
    // * 表现形式像 l、r 同时右移了一位
    if (r - l + 1 - max > k) {
      codes[s[l].charCodeAt(0) - h] -= 1;
      l += 1;
    }

    r += 1;
  }
  return r - l;
}
function A(s: string, k: number): number {
  let l = 0;
  let r = 0;
  let max = 0;
  const cache = Array(26).fill(0);

  const h = "A".charCodeAt(0);

  while (r < s.length) {
    const curIndex = s[r].charCodeAt(0) - h;
    cache[curIndex] += 1;
    if (cache[curIndex] > max) max = cache[curIndex];

    if (r - l + 1 - max > k) {
      cache[s[l].charCodeAt(0) - h] -= 1;
      l += 1;
    }

    r += 1;
  }

  return r - l;
}

// 输入：s = "AABABBA", k = 1
// 输出：4
// 解释：
// 将中间的一个'A'替换为'B',字符串变为 "AABBBBA"。
// 子串 "BBBB" 有最长重复字母, 答案为 4。

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/longest-repeating-character-replacement
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * 438. 找到字符串中所有字母异位词
 * 输入: s = "cbaebabacd", p = "abc"
 * 输出: [0,6]
 * 解释:
 * 起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
 * 起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
 *
 * * 滑动窗口
 * 滑动窗口就是先移动右指针，移动的过程中记录中间量，到达边界再移动左指针
 *
 * 字母 -> charCodeAt
 * 连续 -> 窗口
 */
// 快乐超时
function findAnagrams1(s: string, p: string): number[] {
  const res: number[] = [];
  if (p.length > s.length) {
    return res;
  }

  const pItems = p.split("");
  for (let i = 0; i < s.length - p.length + 1; i += 1) {
    if (!pItems.find((item) => item === s[i])) {
      continue;
    } else {
      let j = 1;
      let done = true;
      while (j < p.length) {
        if (!pItems.find((item) => item === s[i + j])) {
          done = false;
        }
      }
      if (done) res.push(i);
    }
  }

  return res;
}

function findAnagrams(s: string, p: string): number[] {
  const m = s.length;
  const n = p.length;
  const res: number[] = [];

  if (m < n) return res;

  let l = 0;
  let r = 0;
  let valid = 0;
  const windowMap = new Map(),
    pMap = new Map();

  // * 记录需要的每个字符的数量
  for (const char of p) {
    // 无则记 1，有则加 1
    pMap.set(char, (pMap.get(char) || 0) + 1);
  }

  while (r < m) {
    const char = s[r];
    if (pMap.has(char)) {
      windowMap.set(char, (windowMap.get(char) || 0) + 1);

      // * 所需要的字符数量满足要求了，则为有效
      if (windowMap.get(char) === pMap.get(char)) {
        valid += 1;
      }
    }

    // 滑动窗口内 字符数 === p 长度 进行判断
    if (r - l === n - 1) {
      // 有效字符数 === p中字符数，说明找到异位词了。
      if (valid === pMap.size) res.push(l);

      // 无论有没有找到异位词，left 都要右移了。
      const lChar = s[l];
      if (pMap.has(lChar)) {
        // 如果 pMap 中有 char，并且 pMap 中 char 的数量和 windowMap 中的相等，（因为 left 要右移了，所以）valid--，
        if (windowMap.get(lChar) === pMap.get(lChar)) valid -= 1;
        // 因为 l 要右移了，所以 windowMap 中的 char 数量也 - 1，
        windowMap.set(lChar, windowMap.get(lChar) - 1);
      }
      l += 1;
    }

    r += 1;
  }

  return res;
}

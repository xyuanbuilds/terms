/**
 * 剑指 Offer II 020. 回文子字符串的个数
 * @param s
 * @returns
 */
function countSubstrings(s: string): number {
  let res = 0;

  // * 从 0 开始遍历
  for (let i = 0; i < s.length; i += 1) {
    let l = i;
    let r = i;
    // res.add(s[l])
    res += 1;

    while (s[r + 1] === s[l]) {
      r += 1;
      // res.push(s[l].repeat(r - l + 1))
      res += 1;
    }

    while (l - 1 >= 0 && r + 1 < s.length && s[l - 1] === s[r + 1]) {
      l -= 1;
      r += 1;
      // res.add(s.slice(l, r + 1))
      res += 1;
    }
  }

  return res;
}

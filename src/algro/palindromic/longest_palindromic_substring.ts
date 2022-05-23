/**
 * 5. 最长回文子串
 * [*]
 *
 * 中心扩散，i 从 0 开始，找到中心的 l，r边界，再向外扩散找相同元素
 *
 * @param s
 * @returns
 */
export function longestPalindrome(s: string): string {
  let l = 0;
  let r = 0;
  let max = s[0];

  for (let i = 0; i < s.length; i += 1) {
    l = i;
    r = i;
    while (s[r + 1] === s[l]) {
      r += 1;
    }

    while (l - 1 >= 0 && s[l - 1] === s[r + 1]) {
      l -= 1;
      r += 1;
    }

    if (max.length < r - l + 1) {
      max = s.slice(l, r + 1);
    }
  }

  return max;
}

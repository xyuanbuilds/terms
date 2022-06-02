/**
 * 14. 最长公共前缀
 * [*] 前缀类问题的基础版
 *
 * @param strs
 * @returns
 */
function longestCommonPrefix(strs: string[]): string {
  if (strs.length === 1) return strs[0];
  let i = 0;
  while (i < strs[0].length) {
    if (strs.every((s) => s[i] === strs[0][i])) {
      i += 1;
    } else {
      return strs[0].slice(0, i);
    }
  }
  return strs[0].slice(0, i); // * 循环退出，但暂未返回内容
}

/**
 * 3 无重复子串
 * [*]
 *
 * 滑动窗口
 */
function lengthOfLongestSubstring(s: string): number {
  // let l = 0;
  let r = 0;
  let res = 0;

  let has: string[] = [];

  while (r < s.length) {
    const cur = s[r];
    const findIndex = has.findIndex((i) => i === cur); // * 存在重复，窗口整体右移

    if (findIndex >= 0) {
      // l += findIndex + 1; // * 有重复的，l 右移，去掉重复的部分，但实际只需要处理，has，l 可以省去

      has.splice(0, findIndex + 1); // * 已有内容左同样的去除
    } else {
      has.push(cur); // 无重复，记录
      r += 1; // r 右移增大窗口
      if (has.length > res) res = has.length;
    }
  }

  return res;
}
// lengthOfLongestSubstring("abcabcbb");
// debugger

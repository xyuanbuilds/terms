/**
 * 394. 字符串解码
 *
 * 递归、递归中状态留存（括号对记录）、正则
 *
 */
function decodeString(str: string): string {
  function getContent(s: string) {
    let n = null;
    let c = 0;
    let start = null;
    let end = null;
    let res = "";

    for (let index = 0; index < s.length; index += 1) {
      const cur = s[index];

      if (/[a-z]/.test(cur)) {
        if (c === 0) res += cur;
      } else if (cur === "[") {
        c += 1;
        if (start === null) start = index;
      } else if (cur === "]") {
        c -= 1;
        if (c === 0) end = index;
      } else {
        if (n === null) {
          n = cur;
          while (/\d/.test(s[index + 1])) {
            index += 1;
            n += s[index];
          }

          continue;
        }
      }
      if (start !== null && end !== null && c === 0) {
        res += getContent(s.slice(start + 1, end)).repeat(Number(n));
        start = null;
        end = null;
        n = null;
        c = 0;
      }
    }

    return res;
  }

  return getContent(str);
}

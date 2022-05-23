/**
 * 409. 最长回文串
 * @param s
 * @returns
 */
function longestPalindrome(s: string): number {
  const cache = new Map();

  for (let str of s) {
    if (cache.has(str)) {
      cache.set(str, cache.get(str) + 1);
    } else {
      cache.set(str, 1);
    }
  }

  let all = 0;
  let has = false;
  cache.forEach((num) => {
    if ((num & 1) === 1) {
      all += num - 1;
      has = true;
    } else {
      all += num;
    }
  });

  return all + (has ? 1 : 0);
}

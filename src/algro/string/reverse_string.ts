/**
 * 344. 反转字符串
 * 
 * 原地修改输入数组、使用 O(1) 的额外空间解决这一问题。
 * 
 * 也算是双指针的一种思想，头尾两个指针同时遍历，然后中间为交汇点，遍历数不超过数组的一半
 * 
 Do not return anything, modify s in-place instead.
 */
function reverseString(s: string[]): void {
  for (let i = 0; i <= Math.floor(s.length / 2) - 1; i += 1) {
    [s[i], s[s.length - i - 1]] = [s[s.length - i - 1], s[i]];
  }
}

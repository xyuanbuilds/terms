/**a
 * 20. 有效的括号
 *
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
 */
function isValid(s: string): boolean {
  const stack = [];

  for (let str of s) {
    // * 左括号，入栈，等待匹配
    if (str === "(" || str === "[" || str === "{") {
      stack.push(str);
    } else {
      // * 右括号直接匹配，如果不是想要的左括号，则不正确
      if (str === ")") {
        if (stack.pop() !== "(") {
          return false;
        }
      }
      if (str === "]") {
        if (stack.pop() !== "[") {
          return false;
        }
      }
      if (str === "}") {
        if (stack.pop() !== "{") {
          return false;
        }
      }
    }
  }

  return stack.length === 0;
}

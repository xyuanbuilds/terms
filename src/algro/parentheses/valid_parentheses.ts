/**a
 * 20. 有效的括号
 * 
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
 */
function isValid(s: string): boolean {
	const stack = [];

	for (let str of s) {
		if (str === "(" || str === "[" || str === "{") {
			stack.push(str);
		} else {
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

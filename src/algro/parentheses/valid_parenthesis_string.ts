/**
 * 678. 有效的括号字符串
 * [*]
 * 
 * 与普通有效括号问题类似，核心
 * * 借助栈
 * * 验证右括号有效性，即寻找是否有左括号对应
 * * \* 可以做左或右
 * * 1. 所以可以用于左括号不足时代替左括号；
 * * 2. \* 替代右括号时，左括号的栈 在正常循环后不为空，需再次循环确认
 * 
 * 任何左括号 ( 必须有相应的右括号 )。
 * 任何右括号 ) 必须有相应的左括号 ( 。
 * 左括号 ( 必须在对应的右括号之前 )。
 * \* 可以被视为单个右括号 ) ，或单个左括号 ( ，或一个空字符串。
 * 
 * * 括号有效性，可以用一个栈来存储左括号，遇到右括号后出栈
 */
function checkValidString(s: string): boolean {
	const len = s.length;
	const stack1: number[] = []; // 用来存左括号的 index
	const stack2: number[] = []; // 用来存 * 的index

	for (let i = 0; i < len; i++) {
		let c = s.charAt(i);
		if (c === "(") {
			// * 左括号 入栈 index
			stack1.push(i);
		} else if (c == "*") {
			// * 星号 入栈 index
			stack2.push(i);
		}
		// * 出栈 优先出左括号做匹配
		else {
			if (stack1.length > 0) {
				stack1.pop();
			} else if (stack2.length > 0) {
				stack2.pop();
			} else {
				// * 没有 左 来对应了，肯定是错误的
				return false;
			}
		}
	}

	// * 原始右括号匹配结束，对左括号栈逐一出栈，看此时星号栈的栈顶
	// * 如果 星号元素栈顶元素的位置 大于 左括号栈顶元素的位置，说明星号在括号的右侧，可以匹配
	// * 否则不可。
	// * 另外 * 可以多，所以只要处理完左括号即可
	while (stack1.length > 0) {
		if (stack2.length === 0) {
			return false;
		}
		const posStack1 = stack1.pop()!;
		const posStack2 = stack2.pop()!;
		if (posStack1 > posStack2) {
			return false;
		}
	}

	return true;
}
// 输入: "(*))";
// 输出: true

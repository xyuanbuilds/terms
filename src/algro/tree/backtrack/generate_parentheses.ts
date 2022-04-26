/** 
 * 22 括号生成
 * [*]
 * 
 * 括号的性质，必须要掌握
 * 
 * 当前左右括号都有大于 00 个可以使用的时候，才产生分支；
 * 产生左分支的时候，只看当前是否还有左括号可以使用；
 * 产生右分支的时候，还受到左分支的限制，右边剩余可以使用的括号数量一定得在严格大于左边剩余的数量的时候，才可以产生分支；
 * 在左边和右边剩余的括号数都等于 00 的时候结算。
 * 
 * 可使用深度遍历或广度遍历
 * https://leetcode-cn.com/problems/generate-parentheses/solution/hui-su-suan-fa-by-liweiwei1419/
 * 
 */

function generateParenthesis(n: number) {
	const res: string[] = [];
	if (n === 0) {
		return res;
	}

	dfs([], n, n, res);
	return res;
}

function dfs(path: string[], left: number, right: number, res: string[]) {
	if (left == 0 && right == 0) {
		res.push(path.join(""));
		return;
	}

	if (left > right) {
		return;
	}

	if (left > 0) {
		path.push("(");
		dfs(path, left - 1, right, res);
		path.pop();
	}
	if (right > 0) {
		path.push(")");
		dfs(path, left, right - 1, res);
		path.pop();
	}
}

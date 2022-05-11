// @ts-nocheck
/**
 * * 拍平对象，因为需要递归到跟值，所以用dfs
 * {
 *     a: {
 *         b: 'hello ',
 *         c {
 *             d: 'world'
 *         }
 *     },
 *     e: 'hello world'
 * }
 * 
 * 转换为
 * {
 *     'a.b': 'hello',
 *     'a.c.d': 'hello world',
 *     'e': 'hello world'
 * }
 */
function flatObj(obj) {
	const res = {};

	function dfs(curObj: object | string, str: string) {
		if (typeof curObj !== "object") {
			res[str.slice(1)] = curObj;
			return;
		}
		const keys = Object.keys(curObj);
		for (let key of keys) {
			dfs(curObj[key], str.concat(`.${key}`));
		}
	}

	dfs(obj, "");
	return res;
}
var obj = { a: { b: "hello ", c: { d: "world" } }, e: "hello world" };
const res = flatObj(obj);
debugger;

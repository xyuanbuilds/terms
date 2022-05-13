/**
 * curry 柯里化
 * * fn.length 表示函数参数的个数
 * * fn.length <= args.length
 * 
 * 提前返回 和 延迟执行 也很好理解，因为每次调用函数时，它只接受一部分参数，并返回一个函数（提前返回），直到(延迟执行)传递所有参数为止
 */

const curry = (fn: (...params: any[]) => any, ...args: any[]) =>
	// 函数的参数个数可以直接通过函数数的.length属性来访问
	args.length >= fn.length //! 这个判断很关键！！！
	// 传入的参数大于等于原始函数fn的参数个数，则直接执行该函数
	? fn(...args)
	/**
    * * 传入的参数小于原始函数fn的参数个数时
    * * 返回一个接受参数的函数
    * * 递归进行 curry 操作，最终返回一个接受所有参数（当前参数和剩余参数） 的函数
    */
	: (..._args: any[]) => curry(fn, ...args, ..._args);

function add1(x: number, y: number, z: number) {
	return x + y + z;
}
const add = curry(add1);
console.log(add(1, 2, 3));
console.log(add(1)(2)(3));
console.log(add(1, 2)(3));
console.log(add(1)(2, 3));
// function curry1(fn, args) {
// 	if (fn.length <= args.length) {
// 		return fn(...args);
// 	} else {
// 		return (...extraArgs) => curry1(fn, ...args, ...extraArgs);
// 	}
// }

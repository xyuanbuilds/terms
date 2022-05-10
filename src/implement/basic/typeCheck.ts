/**a
 * * 实现一个返回当前类型的函数
 * 
 * * 基本类型、引用类型、包装对象
 * * 基本类型（基本数值、基本数据类型）是一种既非对象也无方法的数据。
 * * “Boolean，String，Number，Symbol，BigInt” 叫包装对象，因为基本类型不可改，无属性，所以需要转换为包装对象
 * * 如 “ ''.length ” 是先把基本类型string转换成包装对象String，然后再调用String.length
 * 
 * typeof 可以判断基本数据类型null除外,引用数据类型除了function，其余也不能准确判断
 * instanceof 可以准确地判断复杂引用数据类型，但不能正确判断基础数据类型
 * Object.prototype.toString 很好的判断引用数据类型，包括浏览器窗口window和document
 * constructor 是不稳定的，开发者一旦重写prototype原有的constructor引用会丢失，需要重新给constructor赋值
 */
export function typeIs(val: any) {
	let type = typeof val;
	if (type !== "object") {
		// 先进行typeof判断，如果是基础数据类型，直接返回
		return type;
	}
	// 对于typeof返回结果是object的，再进行如下的判断，正则返回结果
	return Object.prototype.toString.call(val).replace(/^\[object (\S+)\]$/, "$1");
}

// * 7 种基本类型，1 种引用类型(包括很多类型)
// * 所以对于基本类型，除了 null，都可以使用 typeof
typeof 1; // 'number'
typeof "1"; // 'string'
typeof BigInt(1); // 'bigint'
typeof undefined; // 'undefined'
typeof true; // 'boolean'
typeof null; // * 'object'，但 null 不是引用类型，一般判断null直接 === null
typeof Symbol(); // 'symbol'

// * 以下都是引用类型
typeof console.log; // 'function'
typeof []; // 'object'
typeof {}; // 'object'
typeof console; // 'object'

Object.prototype.toString(); // '[object Object]'
Object.prototype.toString.call({}); // 同上结果，加上call也ok
Object.prototype.toString.call(1); // '[object Number]'
Object.prototype.toString.call("1"); // '[object String]'
Object.prototype.toString.call(true); // '[object Boolean]'
Object.prototype.toString.call(function () {}); // '[object Function]'
Object.prototype.toString.call(null); //'[object Null]'
Object.prototype.toString.call(undefined); //'[object Undefined]'
Object.prototype.toString.call(/123/g); //'[object RegExp]'
Object.prototype.toString.call(new Date()); //'[object Date]'
Object.prototype.toString.call([]); //'[object Array]'
Object.prototype.toString.call(new WeakMap()); // '[object WeakMap]'
Object.prototype.toString.call(document); //'[object HTMLDocument]'
Object.prototype.toString.call(window); //'[object Window]'

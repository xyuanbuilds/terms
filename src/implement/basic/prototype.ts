/**
 * prototype & __proto__
 * 
 * instanceof 就是递归查看原型直到找到，或null
 */
interface P {
	readonly prototype: any;
}
/**
 * Instances of
 * 遍历原型链，直到 __protp__ 指向当前构造对象，或null
 * @param A 
 * @param B 
 * @returns  
 */
export function instanceOf(A: any, B: P) {
	A = A.__proto__;
	while (true) {
		if (A === null) {
			return false;
		}
		if (A === B.prototype) {
			return true;
		}
		A = A.__proto__;
	}
}
// const res = instanceOf("1", String);
// console.log(res);

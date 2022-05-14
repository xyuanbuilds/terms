/**
 * prototype & __proto__
 * 
 * * 继承意味着复制操作，然而 JavaScript 默认并不会复制对象的属性，
 * * 相反，JavaScript 只是在两个对象之间创建一个关联，
 * * 这样，一个对象就可以通过委托访问另一个对象的属性和函数，所以与其叫继承，委托的说法反而更准确些
 * 
 * instanceof 就是递归查看原型链直到找到，或null
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
export function instanceOf(instance: any, cls: P) {
	let point = instance.__proto__;
	while (true) {
		if (point === null) {
			return false;
		}
		if (point === cls.prototype) {
			return true;
		}
		point = point.__proto__;
	}
}
// const res = instanceOf("1", String);
// console.log(res);

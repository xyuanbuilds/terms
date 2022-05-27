/**
 * prototype & __proto__
 *
 * * Object.getPrototypeOf(instance) === instance.__proto__
 * * 继承意味着复制操作，然而 JavaScript 默认并不会复制对象的属性，
 * * 相反，JavaScript 只是在两个对象之间创建一个关联，
 * * 这样，一个对象就可以通过委托访问另一个对象的属性和函数，所以与其叫继承，委托的说法反而更准确些
 *
 * ! 修改原型链上某引用类型，会影响到其它实例值
 *
 * instanceof 就是递归查看原型链直到找到，或null
 *
 * Object.create
 * 创建一个原型为null的空对象
 * o = Object.create(null);
 * o = {};
 * 以字面量方式创建的空对象就相当于:
 * o = Object.create(Object.prototype);
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
  // * 注意处理基本类型，可能需要判断下是否是有效 Object ?
  // let point = instance.__proto__;
  // * 该方法会让基本数值类型变为包装类型，如 1 -> Number(1)，实际情况下
  // * 1 instanceof Number 是 false
  let point = Object.getPrototypeOf(instance); // * 推荐使用 getPrototypeOf

  while (true) {
    if (point === null) {
      // 原型链末尾是 null
      return false;
    }
    // * 当前指向原型为需要比对的原型
    if (point === cls.prototype) {
      return true;
    }
    // * 进入原型链下一层
    point = Object.getPrototypeOf(point);
  }
}
const res = instanceOf(1, Number);
console.log(res);

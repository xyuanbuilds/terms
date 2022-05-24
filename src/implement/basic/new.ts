// @ts-nocheck
/**
 * new 主要做了 4 件事
 * * 1. 创建空对象obj
 * * 2. __proto__ 指向构造函数 constructor.prototype
 * * 3. 空对象obj为this调用构造函数
 * * 4. 返回构造函数结果，无返回结果则返回 obj
 * @param constructor
 * @param arg
 * @returns
 */
function _new(constructor, ...arg) {
  // 创建一个空对象
  var obj = {};
  // 空对象的`__proto__`指向构造函数的`prototype`, 为这个新对象添加属性
  obj.__proto__ = constructor.prototype;
  // obj.constructor(arg)
  var res = constructor.apply(obj, arg);
  // * 返回新对象，如果构造函数不返回对象
  return Object.prototype.toString.call(res) === "[object Object]" ? res : obj;
}

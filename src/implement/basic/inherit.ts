// @ts-nocheck
/**
 * 前端实现继承的方式
 * ! 构造函数的 prototype
 * * 目前主要是用两种
 * * 1. Object.create 直接继承现有实例
 * 				const newObj = Object.create(obj)
 * 				相当于 -> newObj.prototype = obj
 * * 2. class extends
 *
 * * 继承做了什么？
 * 1. 用父构造函数和子构造函数，同时构造对象
 * 2. 构造后对象为，子实例（Child）原型链__proto__ 指向 父实例（Parent）父亲例再指向自己的原型链，构成原型链
 *
 * * 原型链继承
 * 子类的原型 指向父实例 可以公用父亲上的属性和方法，及父的原型方法
 * 坏处是 **修改父类 会影响子类**
 * 且后期对父的函数进行修改 已创建的子的实例并不会应用这种修改
 */
function Parent(aa) {
  this.name = "aa";
  this.aa = aa;
}
Parent.prototype.gender = "male";
function Child() {
  this.age = 12;
}
Child.prototype = new Parent("test");
const boy = new Child();
/**
 * * 借用构造函数继承
 * * 使用父类的构造函数来增强子类实例，等同于复制父类的实例给子类
 * * 无法共享属性和方法 每个对象都是隔离的(构造后的实例 prototype 为 Object)
 */
function Parent1(name) {
  this.name = name;
}
Parent1.prototype.gender = "male";

function Child1(name) {
  Parent1.call(this, name);
  this.age = 12;
}
const boy1 = new Child1("bb");

/**
 * * 组合式继承
 * * 借用构造函数，也修改原型，也就是结合上方两种
 * * 用原型链实现对原型属性和方法的继承，用借用构造函数技术来实现实例属性的继承
 */
function Parent2(name) {
  this.name = name;
}
Parent2.prototype.gender = "male";

function Child2(name) {
  Parent2.call(this, name); // * 一次
  this.age = 12;
}
Child2.prototype = new Parent2("parent_name"); // * 两次
Child2.prototype.constructor = Child2;

const boy2 = new Child2("child_name");

/**
 * * 原型式继承 只是对原型链继承的一个封装 目的 减少父类实例化的开销
 * * 已有父类的一个实例，借用空构造封装原型链继承 解决每次都要new 父类实例的消耗
 * *
 */
function Parent3(name) {
  this.name = name;
}
function Child3(obj) {
  function F() {}
  F.prototype = obj;
  const ins = new F();
  ins.age = 13;
}
// * 已有的父实例
var sup = new Parent3("dd");
var boy3 = Child3(sup);
console.log(boy3.name);

/**
 * * 寄生组合式
 */
function Animal(name) {
  this.name = name;
  this.colors = ["black", "white"];
}
Animal.prototype.getName = function () {
  return this.name;
};
function Dog(name, age) {
  Animal.call(this, name);
  this.age = age;
}

function object(o) {
  // * 空构造函数，借用原型
  function F() {}
  F.prototype = o;
  return new F();
}
function inheritPrototype(child, parent) {
  let prototype = object(parent.prototype);
  prototype.constructor = child; // * 重新赋值构造函数
  child.prototype = prototype;
}
inheritPrototype(Dog, Animal);

// ! 组合寄生
// * 用父类构造，并将原型设置为父类的原型
function Parent4(name) {
  this.name = name;
}
Parent4.prototype.gender = "male";

function Child4(name) {
  Parent4.call(this, name);
  this.age = age;
}

// * 相当于 Child4 与 Parent4 原型相同
Child4.prototype = Object.create(Parent4.prototype);
Child4.prototype.constructor = Child4;

const boy4 = new Child4("child_name");
/**
 * Child4
 *	age: 11 // 自有属性
 *	name: "child_name" // 父属性
 *	[[Prototype]]: Parent4
 *			constructor: ƒ Child4(name)
 *			[[Prototype]]: Object
 *        gender: "male" // 父原型熟悉
 *				constructor: ƒ Parent4(name)
 *				[[Prototype]]: Object
 */
// !

// * 另外，用现有实例来实现继承的，可以用 Object.create，可以不再实现上方的原型式继承
// * Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
// * 实例 -> 原型
const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  },
};

// * person 的所有属性，都在 me 的原型上了，且 me 的原型的原型则是原先 person 的原型
const me = Object.create(person);

// * 如果只是需要继承属性，可以Object.assign
// ! 效果相当于浅拷贝，引用类型会被复制引用，需要注意
// const me1 = Object.assign({}, person)

me.name = "Matthew"; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten

me.printIntroduction();

// more
// * https://juejin.cn/post/6844903696111763470

// * class
// * 最实用继承方式，实现的也是 寄生组合
class Parent5 extends Array {
  constructor(age) {
    super();
    this.name = "parent";
    this.age = age;
  }
  static sexy = "male";
  test() {}
}
class Child5 extends Parent5 {
  constructor(age) {
    super(age);
    this.age1 = 11;
  }
}
/**a
 * Child5
 *  age: 10  // 父属性
 *  age1: 11 // 自有属性
 *  name: "parent"
 *  [[Prototype]]: Parent5 // 原型指向一个父实例,constructor 为 child5
 *  	constructor: class Child5
 *  	[[Prototype]]: Object
 *  		constructor: class Parent5
 *  		test: ƒ test()
 *  		[[Prototype]]: Object
 */

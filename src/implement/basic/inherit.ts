// @ts-nocheck
/**
 * 前端实现继承的方式
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
	Parent2.call(this, name);
	this.age = 12;
}
Child2.prototype = new Parent2("parent_name");
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

// * https://juejin.cn/post/6844903696111763470

// * class
// * 最实用继承
class Parent4 {
	constructor() {
		this.name = "parent";
	}
}
class Child4 extends Parent4 {
	constructor() {
		super();
		this.age = 11;
	}
}

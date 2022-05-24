// @ts-nocheck
/**
 * this
 * this 是在函数被调用时发生的绑定，它指向什么完全取决于函数被谁调用
 * 箭头函数没有 this
 *
 * * function.bind(thisArg[, arg1[, arg2[, ...]]])
 * * call: 它的作用是绑定this和参数，并执行函数
 * *   call() 方法接受的是一个参数列表，而 apply() 方法接受的是一个包含多个参数的数组
 * * apply: 与call相同，只是参数放入了一个数组
 * *
 * * bind 返回一个新的函数
 * *
 * * this 参数可以传 null，当为 null 的时候，视为指向 window
 */
Function.prototype.call2 = function (caller) {
  // * 第一个参数为 调用者，null则将调用者换为 window
  caller = caller === null ? window : Object(context);
  // * 考虑属性覆盖可以用 Symbol
  // * 将要执行的函数，也就是被调用者，这里是this
  // * 作为一个属性，放置在调用者上
  caller.fn = this;

  // * 获取剩余参数
  const args = [].slice.call(arguments, 1);

  // 传递参数
  const result = caller.fn(...args);
  // ! eval会让 string 类型变为变量，导致失败
  // eval(`context.fn(${args.toString()})`);

  // * 执行完后删除该属性
  delete caller.fn;
  return result;
};

Function.prototype.apply2 = function (context, arr) {
  context = context === null ? window : Object(context);
  context.fn = this;

  let result;

  // * 无参数
  if (!arr) {
    result = context.fn();
  } else {
    result = context.fn(...arr);
  }

  delete context.fn;
  return result;
};

Function.prototype.bind2 = function (caller) {
  caller = caller ? Object(caller) : window;

  const boundParams = [].slice.call(arguments, 1);
  // * 当前需要 bind 的 this
  const boundTargetFunc = this;

  function boundedFn(...restArgs) {
    const allParams = boundParams.concat(restArgs);
    boundTargetFunc.apply(caller, allParams);
  }
  boundedFn.prototype = Object.create(
    boundTargetFunc.prototype || Function.prototype
  );

  return boundedFn;
};

var foo = { value: 1 };

function bar(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value);
}
// * bar 方法，被 bind 到 foo 上，再执行
bar.bind2(foo)("sss", 1); // sss, 1, 1
// * 等价于 foo.bar("sss", 1)

// 复习
Function.prototype.bind2 = function (caller, ...args) {
  caller = !caller ? Object(caller) : caller;

  const boundFn = this;

  function bounded(...restArgs) {
    boundFn.apply(caller, [...args, ...restArgs]);
  }

  return bounded;
};

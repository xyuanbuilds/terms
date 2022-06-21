/**
 * curry 柯里化
 * * fn.length 表示函数参数的个数
 * * 根据接受的参数个数，与函数所需要参数的个数对比，
 * * 不够继续接受，够了则直接执行
 *
 * 提前返回 和 延迟执行 也很好理解，因为每次调用函数时，它只接受一部分参数，并返回一个函数（提前返回），直到(延迟执行)传递所有参数为止
 */

const curry = (fn: (...params: any[]) => any, ...args: any[]) =>
  // 函数的参数个数可以直接通过函数数的.length属性来访问
  args.length >= fn.length //! 这个判断很关键！！！
    ? // 传入的参数大于等于原始函数fn的参数个数，则直接执行该函数
      fn(...args)
    : /**
       * * 传入的参数小于原始函数fn的参数个数时
       * * 返回一个接受参数的函数
       * * 递归进行 curry 操作，最终返回一个接受所有参数（当前参数和剩余参数） 的函数
       */
      (..._args: any[]) => curry(fn, ...args, ..._args);

function add1(x: number, y: number, z: number) {
  return x + y + z;
}
const add = curry(add1);
console.log(add(1, 2, 3));
console.log(add(1)(2)(3));
console.log(add(1, 2)(3));
console.log(add(1)(2, 3));
// 复习
function curry2(fn) {
  const need = fn.length;

  function tmp(...args) {
    // * 达到参数数目执行
    if (args.length >= need) {
      return fn(...args);
    } else {
      return (...extra) => {
        // * 未达到继续获取参数
        return tmp(...args, ...extra);
      };
    }
  }

  return tmp;
}

const add2 = curry2(add1);
console.log(add2(1, 2, 3));
console.log(add2(1)(2)(3));
console.log(add2(1, 2)(3));
console.log(add2(1)(2, 3));

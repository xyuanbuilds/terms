/**
 * * 最左的函数参数，最后执行
 * * ...args为最右侧函数的参数，也就是最右侧函数，可以多参数
 * * 其他函数的参数则为其右侧函数的返回值
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
export default function compose(...funcs: Function[]) {
  if (funcs.length === 0) {
    // infer the argument type so it is usable in inference down the line
    return <T extends unknown>(arg: T) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return (...args: any) => funcs.reduce((pre, cur) => pre(cur(...args)));
}

// 复习
// * 最右侧函数先执行
// * middleware 用于对同样参数的流程进行串联，或串联后merge出一个结果
// * ...args为最右侧函数的参数，也就是最右侧函数，可以多参数
// * 其他函数的参数则为其右侧函数的返回值
// function compose1(...fns) {
//   if (fn.length === 0) {
//     return (arg) => arg;
//   }

//   if (fn.length === 1) {
//     return fn[0];
//   }

//   // * 两部分
//   // * 1. (...args) => pre( ? ) // 左侧层层嵌套
//   // * 2. cur(...args)  // 右侧获取外部参数后 执行 作为参数传入
//   return fns.reduce((pre, cur) => {
//     return (...args) => pre(cur(...args));
//   });
// }

// fns.reduce((pre, cur) => (...args) => pre(cur(...args)))

function compose1(...fns) {
  return (...args) => fns.reduce((pre, cur) => pre(cur(...args)));
}

type AnyFunction = (...args: any[]) => any;
function before<T extends AnyFunction>(this: T, callback: () => void) {
  let self = this;
  return function (...args: Parameters<T>): ReturnType<T> {
    callback && callback();
    return self.apply(self, args);
  };
}

function fn(num: number) {
  console.log("before 执行过了", num);
}

// * 如果使用 module 这里会失效，所以最好放在外部
interface Function {
  before: typeof before;
}
Function.prototype.before = before;
// * 对原型链的修改，ts 需要同时修改对应类型的接口
const nFn = fn.before(function () {
  console.log("在函数之前执行");
});
nFn(1);

/**
 * 异步分段获取
 *
 * @param times 分段次数
 * @param callback 结果处理回调
 * @returns
 */
function after<T extends object = {}>(
  times: number,
  callback: (result: T) => any
) {
  const result = {} as T;
  return function (key: any, data: any) {
    result[key] = data;

    times -= 1;
    if (times === 0) {
      callback(result);
    }
  };
}

// * 经过两次处理后，对结果进行处理
const newFn = after<{ name: any; name1: any }>(2, function (result) {
  console.log(result);
});

// import * as fs from "fs";
function testDelay<T>(ms: number, cb: AnyFunction) {
  return new Promise<T>((r) => {
    setTimeout(() => {
      const res = cb();
      r(res);
    }, ms);
  });
}

testDelay<{ name: any }>(100, () => {
  console.log("get name");
  return { name: "name" };
}).then(({ name }) => {
  newFn("name", name);
});

testDelay<{ name1: any }>(100, () => {
  console.log("get name1");
  return { name1: "name" };
}).then(({ name1 }) => {
  newFn("name1", name1);
});

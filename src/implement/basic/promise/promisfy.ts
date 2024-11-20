/**
 * 将一个 cb 回调方法，通过 promise 包裹以更好地在 await 中使用
 *
 * https://github.com/c0x0o/promisfy#readme
 *
 * @param fn
 * @param ctx
 * @returns
 */
function promisify(fn: Function, ctx?: any) {
  return function (...args: any[]) {
    return new Promise((resolve, reject) => {
      const simulateCallback = (e: any, result: any) => {
        if (e) {
          reject(e);
        } else {
          resolve(result);
        }
      };
      const fnArgs = args.concat(simulateCallback);
      fn.apply(ctx || null, fnArgs);
    });
  };
}

const testPromisfy = (path: any, callback: (e: any, result: any) => void) => {
  // 回调第一个参数为 error，第二个参数为 result
  callback(1, path);
};

const rr = promisify(testPromisfy);
rr("help")
  .then((data) => console.log("data is", data))
  .catch((err) => console.error("error is", err));

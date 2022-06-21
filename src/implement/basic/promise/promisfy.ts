/**
 * 将一个 cb 回调方法，通过 promise 包裹以更好地在 await 中使用
 *
 * https://github.com/c0x0o/promisfy#readme
 *
 * @param fn
 * @param ctx
 * @returns
 */
function promisfy(fn: Function, ctx: any) {
  return function (...args: any[]) {
    return new Promise(function (resolve, reject) {
      function callback(e: any, result: any) {
        if (e) {
          reject(e);
        } else {
          resolve(result);
        }
      }

      const fnArgs = args.concat(callback);

      fn.apply(ctx, fnArgs);
    });
  };
}

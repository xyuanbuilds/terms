// @ts-nocheck
// 作者：ssh_晨曦时梦见兮
// 链接：https://juejin.cn/post/6844904094079926286

/**a
 *
 * ```
 * Promise.race([1, new Promise((resolve) => { resolve(300) }), 2, 4]).then(data => {
 *   console.log(data)
 * })
 * 1 Promise {<fulfilled>: undefined}
 * Promise.race([new Promise((resolve) => { resolve(300) }), 1, 2, 4]).then(data => {
 *   console.log(data)
 * })
 * 2 300
 * ```
 */
// * 以及更多内容https://juejin.cn/post/6844904115428917255#heading-33
function Promise(fn) {
  this.cbs = [];

  const resolve = (value) => {
    setTimeout(() => {
      this.data = value;
      this.cbs.forEach((cb) => cb(value));
    });
  };

  fn(resolve);
}

Promise.prototype.then = function (onResolved) {
  return new Promise((resolve) => {
    this.cbs.push(() => {
      const res = onResolved(this.data);
      if (res instanceof Promise) {
        res.then(resolve);
      } else {
        resolve(res);
      }
    });
  });
};

// promise考察：promisify实现
// 原有的callback调用
fs.readFile("test.js", function (err, data) {
  if (!err) {
    console.log(data);
  } else {
    console.log(err);
  }
});

// promisify后
var readFileAsync = promisify(fs.readFile);
readFileAsync("test.js").then(
  (data) => {
    console.log(data);
  },
  (err) => {
    console.log(err);
  }
);

// @ts-nocheck
// 作者：ssh_晨曦时梦见兮
// 链接：https://juejin.cn/post/6844904094079926286
/**
 * * Promise.race：返回第一个 fulfilled 或 rejected
 *
 * * Promise.race 会返回一个由所有可迭代实例中第一个 fulfilled 或 rejected 的实例包装后的新实例。
 *
 * * Promise.allSettled：pending 直到 所有 promise 结束 pending，返回数组结果，
 * * 可以处理 Promise.all 必须要全部正确的问题
 *
 * * 所有 Promise 的状态都变化了，那么新返回一个状态是 fulfilled 的 Promise，
 * *    且它的值是一个数组，数组的每项由所有 Promise 的值和状态组成的对象；
 * * 如果有一个是 pending 的 Promise，则返回一个状态是 pending 的新实例；
 *
 * * Promise.any：任意一个 fulfilled 返回 fulfilled，全 rejected 则返回 rejected，其他都是 pending
 * * 空数组或者所有 Promise 都是 rejected，则返回状态是 rejected 的新 Promise，且值为 AggregateError 的错误；
 * * 只要有一个是 fulfilled 状态的，则返回第一个是 fulfilled 的新实例；
 * * 其他情况都会返回一个 pending 的新实例；
 *
 * ! Promise.resolve(something)，Promise.resolve 会将 Promise实例原样返回，
 * ! 非 Promise实例 则会用 Promise 包裹，返回一个fulfilled 的 promise
 *
 * ! Promise then存在值穿透，也就是 then 如果传入一个非函数参数，该then相当于不存在
 * 值穿透指的是，链式调用的参数不是函数时，会发生值穿透，就传入的非函数值忽略，传入的是之前的函数参数。
 * ! Promise.resolve(1).then(function() { return 2 }).then(Promise.resolve(1)).then(console.log)
 * ! 此时会返回 2，因为 Promise.resolve(1)不是函数，直接穿透跳过
 */

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
function myPromise(constructor) {
  let self = this;
  self.status = "pending"; //定义状态改变前的初始状态
  self.value = undefined; //定义状态为resolved的时候的状态
  self.reason = undefined; //定义状态为rejected的时候的状态
  self.onFullfilledArray = []; // 存储 成功的回调函数
  self.onRejectedArray = []; // 存储 失败的回调函数
  function resolve(value) {
    if (self.status === "pending") {
      // 保证了状态的改变是不可逆的
      self.value = value;
      self.status = "resolved";
      // 在pending时把状态改变为成功并把数据传过来。
      // 并遍历调用成功的回调数组
      console.log(
        "构造函数中 resolved中的 成功回调数组：",
        self.onFullfilledArray
      );
      self.onFullfilledArray.forEach(function (f) {
        f(self.value);
        //如果状态从pending变为resolved，
        //那么就遍历执行里面的异步方法
      });
    }
  }
  function reject(reason) {
    if (self.status === "pending") {
      self.reason = reason;
      self.status = "rejected";
      self.onRejectedArray.forEach(function (f) {
        f(self.reason);
        //如果状态从pending变为rejected，
        //那么就遍历执行里面的异步方法
      });
    }
  }
  //捕获构造异常
  try {
    constructor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

myPromise.prototype.then = function (onFullfilled, onRejected) {
  let self = this;
  let promise2;
  switch (self.status) {
    case "pending":
      promise2 = new myPromise(function (resolve, reject) {
        self.onFullfilledArray.push(function () {
          try {
            let temple = onFullfilled(self.value);
            resolve(temple);
          } catch (e) {
            reject(e);
          }
        });
        self.onRejectedArray.push(function () {
          try {
            let temple = onRejected(self.reason);
            reject(temple);
          } catch (e) {
            reject(e);
          }
        });
      });
    case "resolved":
      promise2 = new myPromise(function (resolve, reject) {
        try {
          let temple = onFullfilled(self.value);
          //将上次一then里面的方法传递进下一个Promise的状态
          resolve(temple);
        } catch (e) {
          reject(e);
        }
      });
      break;
    case "rejected":
      promise2 = new myPromise(function (resolve, reject) {
        try {
          let temple = onRejected(self.reason);
          //将then里面的方法传递到下一个Promise的状态里
          resolve(temple);
        } catch (e) {
          reject(e);
        }
      });
      break;
    default:
  }
  return promise2;
};
var p = new myPromise(function (resolve, reject) {
  setTimeout(function () {
    resolve(111);
  }, 1000);
});
p.then(function (x) {
  console.log(x);
})
  .then(function () {
    console.log("链式调用1");
  })
  .then(function () {
    console.log("链式调用2");
  });
//输出   链式调用1  链式调用2  111

// * 以及更多内容https://juejin.cn/post/6844904115428917255#heading-33
function Promise1(fn) {
  this.cbs = [];
  this.data = undefined;

  const resolve = (value) => {
    setTimeout(() => {
      this.data = value;

      // * 存放 then 的回调
      this.cbs.forEach((cb) => cb(value));
    });
  };

  fn(resolve);
}

Promise1.prototype.then = function (onResolved) {
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

function myPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise).then(resolve, reject); // * 任意一个 promise fulfilled 就会.then 触发 resolve，返回结果
    });
  });
}

// * obj 是对象或函数，且有then
function isPromise(obj) {
  return !!obj && typeof obj === "object" && typeof obj.then == "function";
}

function myPromiseAll(arr) {
  let res = [];
  let count = 0; // ! 需要进行计数，计数达到了才能resolve
  let containPromise = false;

  return new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i++) {
      if (isPromise(arr[i])) {
        containPromise = true;

        arr[i]
          .then((data) => {
            count += 1;
            res[i] = data;

            // if (res.length === arr.length) {
            if (count === arr.length) {
              resolve(res);
            }
          })
          // * 只要有一个错，就 reject
          .catch(reject);
      } else {
        res[i] = arr[i];
      }
    }
    if (!containPromise) resolve(res);
  });
}

/**
 * promise.any 与 all 相反
 * any 只需一个 resolve 就算resolve，全 reject 才 reject
 * @param promises
 * @returns
 */
function myPromiseAny(promises) {
  let res = [];
  let count = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((item, i) => {
      Promise.resolve(item).then(resolve, (err) => {
        res[i] = { status: "rejected", val: err };
        count += 1;
        if (count === promises.length) reject(new Error("没有promise成功"));
      });
    });
  });
}

/**
 * any 与 all 的结合，两者都记录
 * @param promises
 * @returns
 */
function myPromiseAllSettled(promises) {
  let res = [];
  let count = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((item, i) => {
      Promise.resolve(item).then(
        (res) => {
          res[i] = { status: "fulfilled", val: res };
          count += 1;
          if (count === promises.length) resolve(arr);
        },
        (err) => {
          res[i] = { status: "rejected", val: err };
          count += 1;
          if (count === promises.length) resolve(arr);
        }
      );
    });
  });
}

// * 复习
function promiseAll(arr) {
  let res = [];
  let num = 0;

  // * 返回 promise 包裹
  return new Promise((resolve, reject) => {
    // * for 循环遍历 同时在 i 位置添加结果，num 计数
    for (let i = 0; i < arr.length; i++) {
      arr[i]
        .then((data) => {
          res[i] = data;
          num += 1;

          if (num === arr.length) {
            resolve(res);
          }
        })
        .catch(reject);
    }
  });
}

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

function pAllT(arr) {
  let count = 0;
  let res = [];
  return new Promise((r, j) => {
    // * 固定结果位置，不可用 for of

    for (let i = 0; i < arr.length; i += 1) {
      p.then((curRes) => {
        count += 1;
        res[i] = curRes;
        if (count === arr.length) r(res);
      }, j);
    }
  });
}

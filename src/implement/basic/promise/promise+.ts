// * https://github.com/liuyll/ts-promise/blob/master/src/Promise.ts
// @ts-nocheck
// as soon as possible
const asap = (function () {
  if (process && process.nextTick) {
    return process.nextTick;
  } else {
    return setTimeout;
  }
})();

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class PromiseMy {
  constructor(executor) {
    // * 基本内容：一个状态，两个内容
    // 初始化state为等待态
    this.state = PENDING;
    // 成功的值
    this.value = undefined;
    // 失败的原因
    this.reason = undefined;

    // * then 回调暂存，解决异步调用问题
    // 成功存放的数组
    this.onResolvedCallbacks = [];
    // 失败存放法数组
    this.onRejectedCallbacks = [];

    // * resolve
    const resolve = (value) => {
      // state改变,resolve调用就会失败
      if (this.state === PENDING) {
        // resolve调用后，state转化为成功态
        this.state = FULFILLED;
        // 储存成功的值
        this.value = value;

        // 一旦resolve执行，调用成功数组的函数
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };

    // * reject
    const reject = (reason) => {
      // state改变,reject调用就会失败
      if (this.state === PENDING) {
        // reject调用后，state转化为失败态
        this.state = REJECTED;
        // 储存失败的原因
        this.reason = reason;

        // 一旦reject执行，调用失败数组的函数
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    // 如果executor执行报错，直接执行reject
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  thenBasic(onFulfilled, onRejected) {
    // 当状态state为pending时
    if (this.state === PENDING) {
      // * resolve / reject 异步，then 会先 pending，返回一个待执行函数
      // onFulfilled传入到成功数组
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value);
      });
      // onRejected传入到失败数组
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    } else {
      // * 处理同步，及基础的 fulfilled 和 rejected
      // 状态为fulfilled，执行onFulfilled，传入成功的值
      if (this.state === FULFILLED) {
        onFulfilled(this.value);
      }
      // 状态为rejected，执行onRejected，传入失败的原因
      if (this.state === REJECTED) {
        onRejected(this.reason);
      }
    }
  }

  /**
   * * 为了达成链式，我们默认在第一个then里返回一个promise。
   * 就是在then里面返回一个新的promise,称为promise2：promise2 = new Promise((resolve, reject)=>{})
   * @param onFulfilled
   * @param onRejected
   * @returns
   */
  then(onFulfilled, onRejected) {
    const { resolvePromise } = PromiseMy;
    // 声明返回的promise2
    const promise2 = new Promise((resolve, reject) => {
      if (this.state === "fulfilled") {
        let x = onFulfilled(this.value);
        // ! resolvePromise函数，处理自己 return 的 promise 和 默认的promise2 的关系
        resolvePromise(promise2, x, resolve, reject);
      }
      if (this.state === "rejected") {
        let x = onRejected(this.reason);
        resolvePromise(promise2, x, resolve, reject);
      }
      if (this.state === "pending") {
        this.onResolvedCallbacks.push(() => {
          let x = onFulfilled(this.value);
          resolvePromise(promise2, x, resolve, reject);
        });
        this.onRejectedCallbacks.push(() => {
          let x = onRejected(this.reason);
          resolvePromise(promise2, x, resolve, reject);
        });
      }
    });
    // 返回promise，完成链式
    return promise2;
  }

  // * 判断 resolve，reject 结果是否还是 thenable
  static resolvePromise(promise, x, resolve, reject) {
    if (promise === x) {
      throw TypeError("Chaining cycle detected for promise");
    }

    // 如果是Promise实例直接调用then方法，免去了后面判断thenable、取then方法的操作
    if (x instanceof Promise) {
      return x.then(resolve, reject);
    }

    // *  x不是null 且x是对象或者函数，进行取 then 及后续操作
    if (x !== null && (typeof x === "object" || typeof x === "function")) {
      let then, called;
      // A+规定，声明then = x的then方法

      try {
        then = x.then;
      } catch (e) {
        // * return，如果 取 then报错就不走后面判断then的逻辑了
        return reject(e);
      }

      // * 如果then是函数，就默认是promise了，需要额外处理
      if (typeof then === "function") {
        try {
          then.call(
            x,
            function (y) {
              // * 成功和失败只能调用一个
              if (!called) {
                called = true;
                // * resolve的结果可能依旧是promise 那就继续解析
                resolvePromise(promise, y, resolve, reject);
              }
            },
            function (r) {
              // reject
              if (!called) {
                called = true;
                reject(r);
              }
            }
          );
        } catch (e) {
          if (!called) {
            reject(e);
          }
        }
      } else {
        resolve(x);
      }
    } else {
      resolve(x);
    }
  }
}

/**
 * Promise有一个叫做then的方法，里面有两个参数：onFulfilled,onRejected,成功有成功的值，失败有失败的原因
 *
 * 当状态state为fulfilled，则执行onFulfilled，传入this.value。
 * 当状态state为rejected，则执行onRejected，传入this.reason
 * onFulfilled,onRejected如果他们是函数，则必须分别在fulfilled，rejected后被调用，
 * value或reason依次作为他们的第一个参数
 */

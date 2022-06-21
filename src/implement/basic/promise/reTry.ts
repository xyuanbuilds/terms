//* 实现一个 retry 函数，实现 `fn` 请求失败，
//* 针对 `count` 重试，对于重试的 retry，超过 timeout 请求时间，则抛错

/**
 * promise 类问题核心
 * 1. resolve 的传递及触发时机
 * 2. await 和 .then 的选择
 *    await 需要使用 try-catch 进行错误捕获
 *      await 可以有效地与循环结合使用，
 *      .then 则在需要循环的场景需要特殊处理，或采用递归的形式
 *    .then 则类似回调
 *    如果存在递归使用，await 方式会比较容易想出来，且结构更加简洁
 * @param fn
 * @param count
 * @param timeout
 * @returns
 */
function retry(fn: (...args: any) => any, count: number, timeout: number) {
  let times = count;
  return new Promise(async (resolve, reject) => {
    while (times) {
      // * 还有次数继续尝试
      console.log("times", times);

      let fail = false; // * 超时 即 false
      setTimeout(() => {
        console.log("this time fail", times);
        fail = true;
      }, timeout);

      try {
        const res = await fn();

        if (fail) throw new Error("out of time");

        resolve(res);
        break;
      } catch (error) {
        console.log("retry error", error);

        if (!times) reject(error); // * 失败先不 reject，达到次数再 reject
        times -= 1; // * 先减次数
      }
    }
  });
}

/**
 * retry 其实就是promise嵌套
 * 1. retry 完成，需要一个 promise
 * 2. 用于判断重试，徐源一个 promise，因为超时，则直接将本次 reject 以阻挡结果获取
 * @param fn
 * @param count
 * @param timeout
 * @returns
 */
function retryThen(fn: (...args: any) => any, count: number, timeout: number) {
  let times = count;

  return new Promise(async (resolve, reject) => {
    function act() {
      new Promise((r, j) => {
        setTimeout(() => {
          console.log("this time fail", times);
          j(new Error("out of time")); // * 超时会让此次 act rj
        }, timeout);

        fn()
          .then(r)
          .catch((fnError: any) => {
            j(fnError); // * fn 错误会让此次 act rj
          });
      })
        .then((fnRes) => {
          resolve(fnRes);
        })
        .catch((error) => {
          times -= 1; // * 先减次数
          if (!times) {
            // * 失败先不 reject，达到次数再 reject
            reject(error);
          } else {
            // * 递归直到超出重试次数
            act();
          }
        });
    }

    act();
  });
}

let t = 3;

let tmp = 0;
function delay() {
  return new Promise((r) => {
    setTimeout(() => {
      // t -= 1;
      // if (t !== 1) {
      //   j();
      // } else {
      r(1);
      // }
    }, 500);
  });
}

// retry(delay, 4, 400);
retryThen(delay, 4, 400).catch((e) => console.log(e.message));

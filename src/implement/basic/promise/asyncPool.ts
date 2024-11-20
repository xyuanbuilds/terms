/**
 * 并发数控制
 *
 * * 大文件上传
 * https://juejin.cn/post/6844904055819468808
 *
 * @param limit 限制并发数量
 * @param arr 参数列表
 * @param fn 异步函数（返回Promise对象的函数）
 * @returns
 */
async function asyncPool(
  limit: number,
  arr: any[],
  fn: (item: any) => Promise<any>
) {
  const res = [];

  const executing: Promise<any>[] = [];

  for (const item of arr) {
    const tmp = fn(item);
    const p =
      tmp instanceof Promise ? tmp : Promise.resolve().then(() => fn(item));

    res.push(p);

    if (arr.length > limit) {
      // * p 通过 then 创建一个微任务，
      // * p fulfilled 后，会将他创建的 e 从 executing 中移除
      const e: Promise<any> = p.then(() =>
        executing.splice(executing.indexOf(e), 1)
      );

      // * pedding 状态的 e 被放入 executing
      executing.push(e);

      // * 达到并发上限，通过 race 进入等待，等待其中一个 fulfilled
      // * 也就达到了限制并发上限的目的
      if (executing.length >= limit) {
        await Promise.race(executing);
      }
    }
  }

  return Promise.all(res);
}
// https://zhuanlan.zhihu.com/p/495175556?utm_source=wechat_session&utm_medium=social&utm_oi=784495714926465024

// 复习，fn 返回 promise
async function asyncPool1(limit: number, arr, fn) {
  // * 结果保存，用于 Promise.all 处理
  const res = [];

  const waitingCallback: Promise<any>[] = [];

  for (let param of arr) {
    // const will = Promise.resolve().then(() => fn(param));
    const tmp = fn(param);
    const will =
      tmp instanceof Promise ? tmp : Promise.resolve().then(() => tmp);

    res.push(will); // * 执行完后直接放入结果数组

    // * will .then 返回一个新的 promise，然后推入 executing
    const cb = will.then(() => {
      // ! .then 用于设置一个回调
      // ! 在结果完成时在 executing 去除，空出一个等待位置
      waitingCallback.splice(waitingCallback.indexOf(cb), 1);
    });

    waitingCallback.push(cb);

    console.log("will", res.length, waitingCallback.length);

    if (waitingCallback.length >= limit) {
      console.log("executing");
      // * 执行数组达到上限，暂停下来执行出结果为止
      await Promise.race(waitingCallback);
    }
  }

  return Promise.all(res);
}

const delayTest = (res: any) => {
  return new Promise((r) => {
    setTimeout(() => {
      console.log("delayTest", res);
      r(res);
    }, 1000);
  });
};

const asyncPool2 = async (limit: number, arr: any[], fn: any) => {
  const pool: any[] = [];
  const res: any[] = [];

  for (const item of arr) {
    const tmp = fn(item);
    const p = tmp instanceof Promise ? tmp : Promise.resolve().then(() => tmp);

    res.push(p);
    const len = pool.length;
    // pool.push(
    //   p.then(() => {
    //     pool.splice(len, 1);
    //   })
    // );
    const cb = p.then(() => {
      // ! .then 用于设置一个回调
      // ! 在结果完成时在 executing 去除，空出一个等待位置
      pool.splice(pool.indexOf(cb), 1);
    });
    pool.push(cb);

    console.log("pool push", pool.length, res.length);

    if (pool.length >= limit) {
      console.log("hold executing");
      await Promise.race(pool);
    }
  }

  await Promise.all(res);
  return res;
};
export {};
const finalRes = await asyncPool2(3, [1, 2, 3, 4, 5, 6, 7, 8], delayTest);

console.log(finalRes);
// await Promise.race(executing); // executing 中任意一个进入

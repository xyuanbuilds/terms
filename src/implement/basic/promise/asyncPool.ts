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
async function asyncPool(limit: number, arr, fn) {
  const res = [];

  const executing: Promise<any>[] = [];

  for (const item of arr) {
    const p = Promise.resolve().then(() => fn(item));

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

  const executing: Promise<any>[] = [];

  for (let param of arr) {
    const will = Promise.resolve().then(() => fn(param));

    res.push(will); // * 执行完后直接放入结果数组

    // * will .then 返回一个新的 promise，然后推入 executing
    const cb = will.then(() => {
      // * will 创建的新 promise 会在结果完成时在 executing 去除，空出一个等待位置
      executing.splice(executing.indexOf(cb), 1);
      // executing.splice(executing.findIndex(i=> i === will), 1);
    });

    executing.push(cb);

    console.log("will", res.length, executing.length);

    if (executing.length >= limit) {
      console.log("executing");
      // * 执行数组达到上限，暂停下来执行出结果为止
      await Promise.race(executing);
    }
  }

  return Promise.all(res);
}

const delayTest = (res: any) => {
  return new Promise((r) => {
    setTimeout(() => {
      r(res);
    }, 1000);
  });
};

asyncPool1(3, [1, 2, 3, 4, 5, 6, 7, 8], delayTest).then((r) => console.log(r));
// await Promise.race(executing); // executing 中任意一个进入

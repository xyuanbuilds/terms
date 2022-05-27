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
https://zhuanlan.zhihu.com/p/495175556?utm_source=wechat_session&utm_medium=social&utm_oi=784495714926465024
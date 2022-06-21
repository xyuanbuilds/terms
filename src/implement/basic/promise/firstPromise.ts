// * 请求发送一次，p 记录正在发送中的请求（返回promise的函数），finally 中将 p 记录转为 null
function firstPromise(fn: (...args: any[]) => Promise<any>) {
  let p: Promise<any> | null = null;
  return function (...args: any[]) {
    if (p === null) {
      // 否则发送请求，finally时将p置空，那么下一次请求可以重新发起
      p = fn(...args).finally(() => (p = null));
    }

    // 请求的实例，已存在意味着正在请求中，直接返回实例，不触发新的请求
    return p;
  };
}

// 链接：https://juejin.cn/post/7072149856139083812

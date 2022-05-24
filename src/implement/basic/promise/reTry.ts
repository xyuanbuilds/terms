//* 实现一个 retry 函数，实现 `fn` 请求失败，
//* 针对 `count` 重试，对于重试的 retry，超过 timeout 请求时间，则抛错

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

let t = 3;
function delay() {
  return new Promise((r, j) => {
    setTimeout(() => {
      // t -= 1;
      // if (t !== 1) {
      //   j();
      // } else {
      console.log("aaa");
      r(1);
      // }
    }, 300);
  });
}

retry(delay, 4, 400);

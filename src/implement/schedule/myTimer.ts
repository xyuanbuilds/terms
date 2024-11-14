/**
 * 实现一个定时器函数myTimer(fn, a, b)，
 * 让fn执行，
 * 第一次执行是a毫秒后，
 * 第二次执行是a+b毫秒后，
 * 第三次是a+2b毫秒，
 * 第N次执行是a+Nb毫秒后
 *
 * 要求：
 * 1、白板手撕
 * 2、myTimer要有返回值，并且返回值是一个函数，调用该函数，可以让myTimer停掉
 */

const myTimer = (fn: () => void, a: number, b: number) => {
  let times = 0;
  let timer: ReturnType<typeof setTimeout>;

  const action = () => {
    timer = setTimeout(() => {
      fn();
      action();
    }, a + times * b);
  };

  action();
  return () => {
    clearTimeout(timer);
  };
};

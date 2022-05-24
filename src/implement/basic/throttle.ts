function throttle<T extends (...args: any[]) => any>(fn: T, delay: number) {
  let timer: NodeJS.Timeout | null = null;
  return function (...args: Parameters<T>) {
    // * 直到上一个 timer 走完前，不进行新的timer设置
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(null, args);
        timer = null;
      }, delay);
    }
  };
}

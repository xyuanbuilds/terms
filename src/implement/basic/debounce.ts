function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
  let timer: NodeJS.Timeout | null = null;

  // * 返回函数
  return (...args: Parameters<T>) => {
    // * 每一次调用 timer 已设置，则主动清除
    if (timer) {
      clearTimeout(timer);
    }
    // * 进行下一次 setTimeOut
    timer = setTimeout(() => {
      fn.apply(null, args);
      timer = null;
    }, delay);
  };
}

function throttle(fn, time) {
  let timer = null;

  return function (...args) {
    if (timer !== null) return;
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, time);
  };
}

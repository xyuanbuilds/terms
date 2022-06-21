// https://juejin.cn/post/6846687590616137742
// * setTimeout 嵌套 最低延时 4ms
// * 这是一个历史因素权衡后的结果，原本是 1ms，会导致 CPU spinning 和过度耗电。

// 不同浏览器的最低时延会不一致，比如 chrome 的最低时延是 1ms。而如果 timer 嵌套层级很多，那么最低时延是 4ms。具体嵌套层级的阈值不同浏览器也不一致，HTML Standard 当中是 >5，chrome 当中是 >=5。

// 另外，我们也理解了在前面提到的两个问题：

// 各大浏览器的厂商有没有按照规范实现，如果没有是为什么？
// 4ms 这个数字究竟是如何确定的？

// 各大浏览器厂商没有完全按照规范实现，是由于其各自有各自的 benchmark，
// 然后不同浏览器厂商做出了不同的设定。另外，对于这种影响不大的变量，HTML standard 提供了相应的灵活变动。
// 我们也理解了 4ms 产生的背景以及背后浏览器厂商和操作系统厂商的不同考虑，他们各自做出的方案决策和 tradeoff。

// * 如果需要一个尽量 0 的setTimeOut 可以使用 window.postMessage + 监听来实现
// * 此时嵌套 setZeroTimeout 也会小于 4ms 延时
(function () {
  const cbs: (() => any)[] = [];
  const messageName = "zero-timeout-message";

  // 保持 setTimeout 的形态，只接受单个函数的参数，延迟始终为 0。
  function setZeroTimeout(fn: () => any) {
    cbs.push(fn);
    window.postMessage(messageName, "*");
  }

  function handleMessage(event) {
    if (event.source == window && event.data == messageName) {
      event.stopPropagation();
      if (cbs.length > 0) {
        const fn = cbs.shift()!;
        fn();
      }
    }
  }

  window.addEventListener("message", handleMessage, true);

  // 把 API 添加到 window 对象上
  window.setZeroTimeout = setZeroTimeout;
})();

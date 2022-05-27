for (var i = 1; i <= 5; i++) {
  (function (i) {
    setTimeout(() => console.log(i), 1000 * i);
  })(i);
}
// * 1,2,3,4,5

setTimeout(function () {
  console.log(1); // * 宏任务往后
}, 0);

new Promise<void>(function (resolve) {
  console.log(2); // 同步
  for (var i = 0; i < 10000; i++) {
    if (i === 10) {
      console.log(10); // 同步
    }
    i == 9999 && resolve();
  }
  console.log(3); // 同步
}).then(function () {
  console.log(4); // * 微任务
});
console.log(5); // 同步
// * 2,10,3,5,4,1

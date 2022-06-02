//www.zhihu.com/question/430549238
https: new Promise((resolve) => {
  // 返回一个 thenable，需要消耗一次时序，promise1 先console
  let resolvedPromise = Promise.resolve();
  // thenable 处理完成 resolve fulfilled，此时 then 才推入 micro，又消耗一次时序，promise2 先 console
  resolve(resolvedPromise);
}).then(() => {
  console.log("resolvePromise resolved");
});

Promise.resolve()
  .then(() => {
    console.log("promise1");
  })
  .then(() => {
    console.log("promise2");
  })
  .then(() => {
    console.log("promise3");
  });

// 1, 2, resolvePromise resolved, 3

async function async1() {
  console.log("async1 start");
  // await 等待的不是一个 Promise Like 对象的时候，相当于 await Promise.resolve(...)。
  await async2(); // ! 由于无论是否 promise，await 都会产生一个promise，并等待其处理结果
  // ! 所以 await 执行的函数内容为同步，依旧同步执行
  // ! 但无论 await 右侧返回是否 Promise，await 下方的执行都会被推入微任务队列
  // * 但await的后续内容会作为微任务进行
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
console.log("script start");
setTimeout(() => {
  console.log("setTimeout");
}, 0);
requestAnimationFrame(() => {
  // 注意这个函数
  console.log("requestAnimationFrame");
});
async1();
new Promise((resolve) => {
  console.log("promise");
  resolve(1);
}).then(() => {
  console.log("then");
});
console.log("script end");

// hong
//  console.log('setTimeout');

// 微笑
// console.log('async1 end'); 'then'

// 渲染
// console.log('requestAnimationFrame');

// 'script start'
// 'async1 start'
// 'promise'
// 'script end'
// 'async2'
// 'async1 end'
// 'then'
// 'requestAnimationFrame'
// 'setTimeout'

// script start
// async1 start
// ? async2
// promise
// script end
// async1 end
// then
// requestAnimationFrame
// setTimeout

async function async3() {
  console.log("async1 start");
  await async4(); // ! await 会产生一个promise微任务，但如果执行内容为同步，依旧同步执行
  console.log("async1 end");
}
async function async4() {
  return new Promise((r) => {
    r(2);
    console.log("async2");
  });
}
console.log("script start");
setTimeout(() => {
  console.log("setTimeout");
}, 0);
requestAnimationFrame(() => {
  // 注意这个函数
  console.log("requestAnimationFrame");
});
async3();
new Promise((resolve) => {
  console.log("promise");
  resolve(1);
}).then(() => {
  console.log("then");
});
console.log("script end");

// script start
// async1 start
// async2
//  promise
//  script end
//  then
// async1 end
//  requestAnimationFrame
//  setTimeout

// 实现一个LazyMan，可以按照以下方式调用:
// LazyMan(“Hank”)输出:
// Hi! This is Hank!

// LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
// Hi! This is Hank!
// //等待10秒..
// Wake up after 10
// Eat dinner~

// LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
// Hi This is Hank!
// Eat dinner~
// Eat supper~

// LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出
// //等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper
// 以此类推。

// * 链接：https://juejin.cn/post/6844903791188246541
// @ts-nocheck
class _LazyMan {
  tasks = [];
  constructor(name) {
    const task = () => {
      console.log(`Hi! This is ${name}`);
      this._next();
    };

    this.tasks.push(task);

    // * 设定第一个宏任务，用于执行 hello
    setTimeout(() => {
      // 把 this._next() 放到调用栈清空之后执行
      this._next();
    }, 0);
  }

  _next() {
    const task = this.tasks.shift(); // 取第一个任务执行
    task && task();
  }

  sleep(time) {
    this._sleepWrapper(time, false);
    return this; // 链式调用
  }

  sleepFirst(time) {
    this._sleepWrapper(time, true);
    return this;
  }

  _sleepWrapper(time, first) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`);
        this._next(); // * 每一个任务完成了，才会去完成下一个任务
      }, time * 1000);
    };
    // * 先睡，则放到队首
    if (first) {
      this.tasks.unshift(task); // 放到任务队列顶部
    } else {
      this.tasks.push(task); // 放到任务队列尾部
    }
  }

  eat(name) {
    const task = () => {
      console.log(`Eat ${name}`);
      this._next();
    };
    this.tasks.push(task);
    return this;
  }
}

function LazyMan(name) {
  return new _LazyMan(name);
}

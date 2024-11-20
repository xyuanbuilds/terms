// @ts-nocheck
class EventEmitter {
  constructor() {
    this.cache = {};
  }

  on(name, fn) {
    if (this.cache[name]) {
      this.cache[name].push(fn); // 相同name的放到一起
    } else {
      this.cache[name] = [fn];
    }
  }

  off(name, fn) {
    let tasks = this.cache[name];
    if (tasks) {
      const index = tasks.findIndex((f) => f === fn || f.callback === fn);
      if (index >= 0) {
        tasks.splice(index, 1);
      }
    }
  }

  emit(name, once = false, ...args) {
    if (this.cache[name]) {
      // * 创建副本，如果回调函数内继续注册相同事件，会造成死循环
      let tasks = this.cache[name].slice(); // * 先复制出需要处理的内容，防止死循环

      for (let fn of tasks) {
        fn(...args);
      }
      if (once) {
        delete this.cache[name];
      }
    }
  }
}

// 测试
let eventBus = new EventEmitter();
let fn1 = function (name, age) {
  console.log(`${name} ${age}`);
};
let fn2 = function (name, age) {
  console.log(`hello, ${name} ${age}`);
};

// * 发布 & 订阅都由 eventBus 来处理
// * event bus 为 订阅者 fn1 订阅一个 aaa 时间
eventBus.on("aaa", fn1);
eventBus.on("aaa", fn2);
// * 发布者 调用 eventBus.emit 发布一个 aaa 事件并携带了一些信息
eventBus.emit("aaa", false, "布兰", 12);
// '布兰 12'
// 'hello, 布兰 12'
// !观察者模式和发布订阅模式本质上的思想是一样的，而发布订阅模式可以被看作是观察者模式的一个进阶版。
// !只是观察者双方关联更紧密，发布订阅则一般强调订阅及发布的事件类型（虽然观察者也可通过内置type来实现）

class T {
  events = {};

  on(eventName, fn) {
    if (this.events[eventName]) {
      this.events[eventName].push(fn);
    } else {
      this.events[eventName] = [fn];
    }
  }

  off(name, fn) {
    let tasks = this.events[name];
    if (tasks) {
      const index = tasks.findIndex((f) => f === fn);
      if (index >= 0) {
        tasks.splice(index, 1);
      }
    }
  }

  emit(name, destroy, ...args) {
    const tasksNum = this.events[name]?.length || 0;

    for (let i = 0; i < tasksNum; i += 1) {
      this.events[name][i](...args);
    }

    if (destroy && tasksNum) this.events[name].splice(0, tasksNum);
  }
}

let tt = new T();
// * 发布 & 订阅都由 eventBus 来处理
// * event bus 为 订阅者 fn1 订阅一个 aaa 时间
tt.on("aaa", fn1);
tt.on("aaa", fn2);
// * 发布者 调用 eventBus.emit 发布一个 aaa 事件并携带了一些信息
tt.emit("aaa", true, "布兰", 12);
console.log(tt.events);
tt.on("aaa", fn2);
eventBus.emit("aaa", false, "布兰1", 22);
console.log(tt.events);

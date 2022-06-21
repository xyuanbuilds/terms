class Scheduler {
  queue: {
    done: (value?: unknown) => void;
    action: () => Promise<any>;
  }[] = [];
  limit = 0;
  execting = 0;

  constructor(limit: number) {
    this.limit = limit;
  }

  add(task: () => Promise<any>) {
    return new Promise((resolve) => {
      this.queue.push({
        action: task,
        // * 为了让add侧也能收到task返回值，可以在每个task
        // * task 执行完成后 then 获取 res，同时 resolve add 返回的promise
        done: resolve,
      });
      this.run(); // * 每推入一个触发一个run，看看能不能执行个啥
    });
  }

  run() {
    // * 超过执行上线了会先不执行
    // * 队列里没有等待执行的了，不再执行
    if (this.execting < this.limit && this.queue.length > 0) {
      this.execting += 1;
      const task = this.queue.shift()!; // * 从队列中取一个任务出来

      task.action().then((res) => {
        this.execting -= 1;

        task.done(res); // * done返回出 action 执行的值
        this.run(); // * 执行完一个后触发一下 run
      });
    }
  }
}

const timeout = (time: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, time * 100);
  });
// test
const scheduler = new Scheduler(2);

const addTask = (time: number, order: any) => {
  scheduler.add(() => timeout(time).then(() => console.log(order)));
};

addTask(4, 4);
addTask(2, 2);
addTask(5, 3);
addTask(1, 1);
// 2, 4, 1, 3
// scheduler.start();

class Scheduler1 {
  limit: number;
  execting: number;
  tasks: {
    task: () => Promise<any>;
    done: (res: any) => void;
  }[];
  constructor(limit: number) {
    this.limit = limit;
    this.execting = 0;
    this.tasks = [];
  }

  add(task: () => Promise<any>) {
    return new Promise((r) => {
      this.tasks.push({
        task,
        done: (res) => r(res),
      });
      this.run();
    });
  }

  run() {
    if (this.execting < this.limit && this.tasks.length) {
      const item = this.tasks.shift()!;
      this.execting += 1;

      item.task().then((res) => {
        item.done(res);
        this.execting -= 1;
        this.run();
      });
    }
  }
}

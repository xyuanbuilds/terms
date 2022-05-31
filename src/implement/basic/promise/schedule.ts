class Scheduler {
  queue: {
    done: (value?: unknown) => void;
    action: () => Promise<any>;
  }[] = [];
  limit = 0;
  execting = 0;

  constructor(limit: number) {
    // if (typeof limit !== "number" || Math.floor(limit) <= 0) {
    //   throw new TypeError("limit must be a positive number");
    // }
    this.limit = limit;
  }

  // add(promiseCreator) {
  //   return new Promise((resolve) => {
  //     promiseCreator.resolve = resolve;
  //     this.queue.push(promiseCreator);
  //     this.run();
  //   });
  // }

  add(task: () => Promise<any>) {
    return new Promise((resolve) => {
      this.queue.push({
        action: task,
        done: resolve,
      });
      this.run(); // * 每执行一个触发一个run
    });
  }

  run() {
    if (this.execting < this.limit) {
      this.execting += 1;
      const task = this.queue.shift();

      task?.action().then((res) => {
        this.execting -= 1;

        task.done(res); // * done返回出 action 执行的值
        this.run(); // * 执行完一个后触发一下 run
      });
    }
  }

  // number = 0;
  // start() {
  //     if (this.number < this.limit&&this.queue.length) {
  //         var [timeout, str] = this.queue.shift()
  //         this.number++
  //         setTimeout(() => {
  //             console.log(str)
  //             this.number--
  //             this.start()
  //         }, timeout * 1000);
  //         this.start()
  //     }
  // }
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
addTask(3, 3);
addTask(1, 1);
// 2, 4, 3, 1
// scheduler.start();

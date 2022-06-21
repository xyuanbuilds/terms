class Lazy {
  tasks: any[];
  origin: any;
  constructor(origin: any) {
    this.tasks = [];
    this.origin = origin;
  }

  a() {
    this.tasks.push((res: any) => {
      res.push(1);
      console.log("a done");
      return res;
    });

    return this;
  }

  b() {
    this.tasks.push((res: any) => {
      return new Promise((r) => {
        setTimeout(() => {
          res.push(2);
          console.log("b done");
          r(res);
        }, 1000);
      });
    });

    return this;
  }

  async exec() {
    let res = this.origin;

    // !不可使用 forEach，需要使用 for of 或 for
    // this.tasks.forEach(async (task) => {
    //   res = await task(res);
    // });

    for (let task of this.tasks) {
      res = await task(res);
    }

    console.log("res", res);

    return res;
  }
}

const s = new Lazy([]).a().b().exec();

// class PathHandler {
//   match = true;
//   tasks = []

//   constructor(path) {
//     this.path = path;
//   }

//   addMatch(macher) {
//     this.match = macher(this.path)

//     return this;
//   }

//   addTask(task) {
//     this.tasks.push(() => {
//       if (!this.matched) return;
//       task(this.path);
//     })

//     return this;
//   }

//   exec() {

//   }
// }

// new PathHandler(path).addMatch((path) => {
//   path.
// }).addTask((path) => {

// }).exec();

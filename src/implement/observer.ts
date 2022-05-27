// @ts-nocheck
let observer_ids = 0;
let subject_ids = 0;

// * 观察者类
class Observer {
  constructor() {
    // * 观察者唯一标识
    this.id = observer_ids++;
  }
  // * 观测到变化后进行处理
  // * 可以获得来自 被观察者的信息
  update(ob, state) {
    console.log(
      "观察者" + this.id + `-检测到被观察者${ob.id}变化` + `${state.a}`
    );
  }
}
// * 被观察者
class Subject {
  constructor() {
    this.observers = [];
    this.id = subject_ids++;
  }
  // * 添加观察者，也称 attach
  addObserver(observer) {
    this.observers.push(observer);
  }
  //删除观察者
  removeObserver(observer) {
    this.observers = this.observers.filter((o) => {
      return o.id != observer.id;
    });
  }
  //通知所有的观察者
  notify(state) {
    this.observers.forEach((observer) => {
      observer.update(this, state);
    });
  }
}

let sub = new Subject();
let mObserver1 = new Observer();
let mObserver2 = new Observer();

// * 观察者被创建后，被观察者主动添加观察者
sub.addObserver(mObserver1);
sub.addObserver(mObserver2);

sub.notify({ a: 1 });
// 复习
class Observer1 {
  constructor() {
    this.id = observer_ids += 1;
    // this.type 可以增加type
  }

  update(subjectId, states) {
    // ...
    console.log(subjectId, states);
  }
}

class Subject1 {
  observers = [];
  constructor() {
    this.observers = [];
    this.id = subject_ids += 1;
  }

  addObserver(observer) {
    // 可以做type限定
    this.observers.push(observer);
  }

  removeObserver(removeId) {
    this.observers = this.observers.filter((i) => i.id !== removeId);
  }

  notify(states) {
    // 可以做type限定
    this.observers.forEach((ob) => ob.update(this.id, states));
  }
}

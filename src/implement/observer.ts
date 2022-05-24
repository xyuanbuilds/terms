// @ts-nocheck
let observer_ids = 0;
let subject_ids = 0;
// * 观察者类
class Observer {
  constructor() {
    this.id = observer_ids++;
  }
  //观测到变化后的处理
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

sub.addObserver(mObserver1);
sub.addObserver(mObserver2);

sub.notify({ a: 1 });

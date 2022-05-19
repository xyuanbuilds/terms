export class NQueue<T extends unknown = string> {
  _limit: number = 3;

  _arr: Array<T> = [];

  constructor(limit: number = 3) {
    this._limit = limit;
  }

  push(item: T) {
    if (this._arr.length === this._limit) {
      this._arr.shift();
      this._arr.push(item);
    } else {
      this._arr.push(item);
    }
  }

  show() {
    return this._arr.toString();
  }
}

const a = new NQueue(3);
a.push("2");
a.push("3");
a.push("1");
a.push("4");
console.log(a.show());

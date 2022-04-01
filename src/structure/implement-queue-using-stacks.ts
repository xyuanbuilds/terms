/**
 * 232
 *
 * a\b\c | d  -> d\c\b | a
 * 两个栈，左边导右边，可以调换顺序，将后入的内容放到栈低，这样就可以，先入先出了
 */
class MyQueue {
  queueIn: number[];
  queueOut: number[];
  constructor() {
    this.queueIn = [];
    this.queueOut = [];
  }

  push(x: number): void {
    this.queueIn.push(x);
  }

  pop(): number {
    if (this.queueOut.length === 0) {
      while (this.queueIn.length) {
        this.queueOut.push(this.queueIn.pop()!);
      }
      return this.queueOut.pop()!;
    }
    return this.queueOut.pop()!;
  }

  peek(): number {
    if (this.queueOut.length === 0) {
      while (this.queueIn.length) {
        this.queueOut.push(this.queueIn.pop()!);
      }
      return this.queueOut[this.queueOut.length - 1];
    }
    return this.queueOut[this.queueOut.length - 1];
  }

  empty(): boolean {
    return this.queueOut.length === 0 && this.queueIn.length === 0;
  }
}

/**
 * 232
 *
 * 剑指 Offer 09. 用两个栈实现队列
 *
 * a\b\c | d  -> d\c\b | a
 * 两个栈，左边导右边，可以调换顺序，将后入的内容放到栈低，这样就可以，先入先出了
 */
class MyQueue {
  stackIn: number[];
  stackOut: number[];
  constructor() {
    this.stackIn = [];
    this.stackOut = [];
  }

  push(x: number): void {
    this.stackIn.push(x);
  }
  // appendTail(value: number): void {}

  pop(): number {
    // * 用于出的 stack 空的时候，把用于进的 stack 全提取出来
    // * 此时 pop 就是stackIn的栈底
    if (this.stackOut.length === 0) {
      while (this.stackIn.length) {
        this.stackOut.push(this.stackIn.pop()!);
      }
      return this.stackOut.pop()!;
    }
    // * 不空就继续pop stackOut，保证维持先入先出的顺序
    return this.stackOut.pop()!;
  }

  peek(): number {
    if (this.stackOut.length === 0) {
      while (this.stackIn.length) {
        this.stackOut.push(this.stackIn.pop()!);
      }
      return this.stackOut[this.stackOut.length - 1];
    }
    return this.stackOut[this.stackOut.length - 1];
  }

  empty(): boolean {
    return this.stackOut.length === 0 && this.stackIn.length === 0;
  }
}

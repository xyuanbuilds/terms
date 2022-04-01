/**
 * 232
 */
class MyStack {
  queueL: number[];
  queueR: number[];
  constructor() {
    this.queueL = [];
    this.queueR = [];
  }

  push(x: number): void {
    if (this.queueL.length !== 0) {
      this.queueL.push(x);
    } else {
      this.queueR.push(x);
    }
  }

  pop(): number {
    if (this.queueL.length > 0) {
      while (this.queueL.length > 1) {
        this.queueR.push(this.queueL.shift()!);
      }
      return this.queueL.shift()!;
    } else {
      while (this.queueR.length > 1) {
        this.queueL.push(this.queueR.shift()!);
      }
      return this.queueR.shift()!;
    }
  }

  top(): number {
    if (this.queueL.length > 0) {
      while (this.queueL.length > 1) {
        this.queueR.push(this.queueL.shift()!);
      }
      return this.queueL[0];
    } else {
      while (this.queueR.length > 1) {
        this.queueL.push(this.queueR.shift()!);
      }
      return this.queueR[0];
    }
  }

  empty(): boolean {
    return this.queueL.length === 0 && this.queueR.length === 0;
  }
}

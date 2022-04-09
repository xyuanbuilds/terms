class MinStack {
  arr: any[];
  min?: number = undefined;
  constructor() {
    this.arr = [];
  }

  push(val: number): void {
    if (this.min === undefined) {
      this.min = val;
    } else if (this.min > val) {
      this.min = val;
    }
    this.arr.push(val);
  }

  pop(): void {
    const v = this.arr.pop();
    if (this.min === v) {
      this.min = this.arr[0];

      for (let i = 1; i < this.arr.length; i += 1) {
        this.min = this.min! > this.arr[i] ? this.arr[i] : this.min;
      }
    }
  }

  top(): number {
    return this.arr[this.arr.length - 1] ?? null;
  }

  getMin(): number | undefined {
    return this.min;
  }
}

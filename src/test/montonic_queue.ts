class MontonicQueue {
  arr: number[];

  constructor() {
    this.arr = [];
  }

  push(n: number) {
    while (this.arr.length > 0 && this.arr[this.arr.length - 1] <= n) {
      this.arr.pop();
    }
    this.arr.push(n);
  }

  size() {
    return this.arr.length;
  }

  max() {
    return this.arr[0];
  }

  pop(n: number) {
    if (n === this.arr[0]) {
      this.arr.shift();
    }
  }
}

function maxSlidingWindow(nums: number[], k: number): number[] {
  const res: number[] = [];
  const win = new MontonicQueue();

  for (let i = 0; i < nums.length; i += 1) {
    if (i < k - 1) {
      win.push(nums[i]);
    } else {
      win.push(nums[i]);
      res.push(win.max());
      win.pop(nums[i - k + 1]);
    }
  }

  return res;
}

const res = maxSlidingWindow([-7, -8, 7, 5, 7, 1, 6, 0], 4);

console.log(res);

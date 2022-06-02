/**a
 * 346\剑指 Offer II 041. 滑动窗口的平均值
 *
 */
class MovingAverage {
  arr: number[];
  sum: number;
  limit: number;
  constructor(size: number) {
    this.sum = 0;
    this.limit = size;
    this.arr = [];
  }

  next(val: number): number {
    if (this.arr.length == this.limit) {
      this.sum -= this.arr.shift()!;
    }
    this.arr.push(val);
    this.sum += val;
    return this.sum / this.arr.length;
  }
}

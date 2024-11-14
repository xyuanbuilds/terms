/**
 * 提供了一个RedPackage的类，初始化时传入红包金额和个数，需要实现一个openRedPackage方法，每调一次都进行一次“抢红包”
 * 并以console.log的形式输出抢到的红包金额。
 *
 * https://juejin.cn/post/7419728124340600886
 */
class RedPackage {
  total: number;
  count: number;
  remain: number;
  min = 1;

  constructor(total: number, count: number) {
    this.total = total;
    this.count = count;
    // 剩余的英文
    this.remain = total * 100;
    this.count = count;
  }

  getRandomByRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  openRedPackage(): number {
    if (this.count <= 0) {
      console.log("done");
      return 0;
    }

    // 最大拿
    const max = (this.remain / this.count) * 3 - 1 * 3;

    const cur =
      this.count === 1 ? this.remain : this.getRandomByRange(this.min, max);

    this.count -= 1;
    this.remain -= cur;
    console.log(cur / 100, this.remain);
    return cur / 100;
  }
}

const instance = new RedPackage(10, 10);

let res111 = 0;
for (let i = 0; i < 12; i += 1) {
  res111 += instance.openRedPackage();
}

console.log("res: ", res111);

/**
 * ## 问题1
 * 实现 getValue 函数，安全的获取目标对象指定 path 的值
 * @params {object | array} value 指定对象
 * @params {string} path
 */

function getValue(value: Record<string, object>, path: string) {
  //   这两个正则表达式的功能是相同的，都是用来匹配字符 "."，"[" 或 "]"。但是它们的写法有所不同。
  // /\.|\[|\]/：这个正则表达式使用了管道符 "|"，它在正则表达式中表示 "或" 的意思，所以这个正则表达式的意思是匹配 "." 或 "[" 或 "]"。
  // /[\.\[\]]/：这个正则表达式使用了字符类 "[]"，在字符类中，只要匹配到任何一个字符就算匹配成功，所以这个正则表达式的意思也是匹配 "." 或 "[" 或 "]"。
  // 所以，这两个正则表达式的功能是相同的，只是写法不同。
  const keys = path.split(/\.|\[|\]/).filter(Boolean);

  return keys.reduce<object>((obj, key) => {
    if (!obj) {
      return undefined;
    }
    return obj[key];
  }, value);
}

const object1 = { a: [{ b: { c: 3 } }] }; // path: 'a[0].b.c'
const array1 = [{ a: { b: [1] } }]; // path: '[0].a.b[0]'
console.log(1, getValue(object1, "a[0].b.c")); // 3
console.log(2, getValue(array1, "[0].a.b[0]")); // 1
console.log(3, getValue({ a: 1 }, "a")); // 1

class RedPackage {
  private amount: number;
  private count: number;

  constructor(amount: number, count: number) {
    this.amount = amount;
    this.count = count;
  }

  openRedPackage() {
    if (this.count <= 0) {
      console.log("No more red packets available.");
      return;
    }

    if (this.count === 1) {
      console.log(`Congratulations! You got ${this.amount.toFixed(2)} yuan.`);
      this.count--;
      return;
    }

    // 最大拿两倍
    const maxAmount = (this.amount / this.count) * 2;
    console.log("maxAmount", maxAmount, this.amount);
    const randomAmount = Math.random() * maxAmount;
    const amount = Math.min(randomAmount, this.amount);
    this.amount -= amount;
    this.count--;

    console.log(`Congratulations! You got ${amount.toFixed(2)} yuan.`);
  }
}

const redPackage = new RedPackage(100, 10);

for (let i = 0; i < 11; i += 1) {
  redPackage.openRedPackage();
}
console.log("done");

// ...

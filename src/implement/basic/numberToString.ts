/**
 * 数字 1234567890
 * 转化为 1,234,567,890 字符串
 */

const numberToStr = (v: number) => {
  const str = String(v).split("");
  const result: string[] = [];
  let count = 0;

  for (let i = str.length - 1; i >= 0; i--) {
    if (count === 3 && i !== -1) {
      result.unshift(",");
      count = 0;
    }
    result.unshift(str[i]);
    count++;
  }

  return result.join("");
};

const numberToStr1 = (v: number) => {
  // 直接使用 toLocaleString() 方法，时间复杂度 O(n)
  // return v.toLocaleString('en-US', { maximumFractionDigits: 0 });

  // 如果不想使用内置方法，这是另一个优化版本：
  const str = String(v);
  const len = str.length;
  const result = new Array(len * 2).fill(""); // 预分配足够空间

  let position = result.length - 1;
  let count = 0;

  for (let i = len - 1; i >= 0; i--) {
    if (count === 3 && i !== 0) {
      result[position] = ",";
      position--;
      count = 0;
    }
    result[position] = str[i];
    position--;
    count++;
  }

  return result.slice(position + 1).join("");
};
const ssss = numberToStr1(12345678);
console.log(11);

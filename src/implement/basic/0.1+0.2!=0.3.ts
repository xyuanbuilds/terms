/**a
 * 数值精度问题
 *
 * 1. 非是 ECMAScript 独有
 * 2. IEEE754 标准中 64 位的储存格式，比如 11 位存偏移值
 * 3. 其中涉及的三次精度丢失
 *
 * * 问题的出现是因为小数精度丢失导致，
 * * 通过对 表达式的结果保留几位小数 得到的字符串再转为浮点数，以获得正确的结果
 *
 * 1. 先转为保留多少精度的字符串；
 * 2. 再转为浮点数，这样就能保证是正确的浮点数对比了
 *
 * 位是bit，字节是byte，1byte = 8bit
 * 更多内容：https://www.cnblogs.com/zhangycun/p/7880580.html
 */
/**
 * @description 将数学表达式的结果 -> 保留几位小数的字符串 -> 转为为浮点数
 * @param operator 数学表达式
 * @param j 保留几位小数 || 默认十位
 */
export function toFloatFixed(operator: number, j = 10) {
  return Number.parseFloat(operator.toFixed(j));
}
// console.log(toFloatFixed(0.1 + 0.2) === 0.3);
// * 相关内容
[1, 2, 3].map(parseInt); // [1, NaN, NaN]
[1, 2, 3].map((i, index) => parseInt(String(i), index)); // 相当于该内容
//parseInt(string, radix)  解析一个字符串并返回指定基数的十进制整数，
//radix 是 2-36 之间的整数，表示被解析字符串的基数。

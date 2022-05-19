/**
 * 实现 getValue 函数，安全的获取目标对象指定 path 的值
 * @params {object | array} value 指定对象
 * @params {string} path
 */

const object = { a: [{ b: { c: 3 } }] }; // path: 'a[0].b.c'
const array = [{ a: { b: [1] } }]; // path: '[0].a.b[0]'

function getValue(value: object, path: string) {
  const paths = path.split(/\[|\]|\./).filter((i) => i !== "");

  return paths.reduce((pre, cur) => pre[cur], value);
}

console.log(1, getValue(object, "a[0].b.c")); // 3
console.log(2, getValue(array, "[0].a.b[0]")); // 1
console.log(3, getValue({ a: 1 }, "a")); // 1

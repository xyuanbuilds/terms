/** 数组 reduce 实现, 不使用原生 reduce 方法 */
function reduce(
  arr: any[],
  fn: (acc: any, item: any) => any,
  initialValue: any
) {
  let acc = initialValue;
  for (let i = 0; i < arr.length; i++) {
    acc = fn(acc, arr[i]);
  }
  return acc;
}

reduce([1, 2, 3], (acc, item) => acc + item, 0);
export default reduce;

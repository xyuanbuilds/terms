/**
 * * [1, [2, [3]]].flat(2)  // [1, 2, 3]
 * @param arr
 * @returns
 */
function flatten(arr: any[]) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}

function flattenS(arr: any[]) {
  return arr.toString().split(",");
}

function flattenA(arr: any[]) {
  let res = arr;
  while (res.some(Array.isArray)) {
    res = res.flat();
  }

  return res;
}

// 链接：https://juejin.cn/post/6946022649768181774
function flatten1(arr: any[]) {
  let res: any[] = [];

  for (let item of arr) {
    if (Array.isArray(item)) {
      res = res.concat(flatten(item));
    } else {
      res.push(item);
    }
  }
  return res;
}
// 复习

function flatten2(arr: any[]) {
  let res: any[] = [];

  for (let item of arr) {
    if (Array.isArray(item)) {
      res.push(...flatten2(item));
    } else {
      res.push(item);
    }
  }

  return res;
}
console.log(flatten2([1, [2, [3]]]));

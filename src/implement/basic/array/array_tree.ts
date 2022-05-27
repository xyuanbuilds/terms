const testAr = [
  { pid: 0, id: 1, name: "a" },
  { pid: 1, id: 2, name: "b" },
  { pid: 0, id: 3, name: "c" },
  { pid: 2, id: 4, name: "d" },
];

/**
 * 将平铺的数组结构转化为树形结构
 * @param arr
 * @returns
 */
function parser(arr: Record<any, any>[]) {
  const output = {};

  arr.forEach((item) => {
    if (!output[item.pid]) {
      output[item.pid] = {
        children: [item],
      };
    } else {
      output[item.pid].children.push(item);
    }

    Reflect.deleteProperty(item, "pid");
  });

  return output;
}
// const res = {
//   "0": {
//     children: [
//       { id: 1, name: "a" },
//       { id: 3, name: "c" },
//     ],
//   },
//   "1": { children: [{ id: 2, name: "b" }] },
//   "2": { children: [{ id: 4, name: "d" }] },
// };
console.log(JSON.stringify(parser(testAr)));

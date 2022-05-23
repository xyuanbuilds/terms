/**
 * [...new Set(arr)]
 * @param arr
 * @returns
 */
const unique = (arr: any[]) => [...new Set(arr)];

function unique1(arr: any[]) {
  var res = arr.filter(function (item, index, array) {
    return array.indexOf(item) === index;
  });
  return res;
}

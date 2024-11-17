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

function unique_hash(arr: any[]) {
  const hash: Record<any, true> = {};
  const res = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (!hash[arr[i]]) {
      hash[arr[i]] = true;
      res.push(arr[i]);
    }
  }

  return res;
}

function unique_sort(arr: any[]) {
  if (arr.length === 0) return [];
  arr.sort();
  const res = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) {
      res.push(arr[i]);
    }
  }
  return res;
}

function unique_best(arr: any[]) {
  return Array.from(new Set(arr));
}

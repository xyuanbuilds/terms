/**
 * 剑指 Offer 40. 最小的k个数
 *
 * 取 top k，min k 类问题，可以使用快排partition来实现
 *
 * @param arr
 * @param l
 * @param r
 * @returns
 */
function quick(arr: any[], l: number, r: number) {
  // if (arr.length === 1) return;

  const done = partition(arr, l, r);
  if (done === null) return;

  quick(arr, l, done - 1); // 注意 l
  quick(arr, done + 1, r); // 注意 r
}

function swap(arr, l, r) {
  [arr[l], arr[r]] = [arr[r], arr[l]];
}

function partition(arr: any[], l: number, r: number): null | number {
  // ! 注意此处的边界处理，不处理栈溢出
  if (l >= r) {
    return null;
  }

  const p = arr[l]; // 取区块第一位做位置固定
  let should = l; // 寻找第一位该放置的地方

  for (let i = l + 1; i <= r; i += 1) {
    if (arr[i] < p) {
      should += 1;
      swap(arr, should, i);
    }
  }

  swap(arr, l, should);

  return should;
}

function getLeastNumbers(arr: number[], k: number): number[] {
  quick(arr, 0, arr.length - 1);

  return arr.slice(0, k);
}

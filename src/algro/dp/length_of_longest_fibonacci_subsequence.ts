/**
 * 873. 最长的斐波那契子序列的长度
 * @param arr
 */
function lenLongestFibSubseq(arr: number[]): number {
  let set = new Set(arr);
  let count = 2;
  let max = 0;

  // * 因为是子序列，所以最长序列可能在前半部分，也有可能在后半部分，所以需要遍历
  // * 且i-2和i-1的index顺序也有可能相差很远，所以要双层for遍历 i-2 和 i-1
  // * 注意边界为 arr.length - 2 和 arr.length - 1
  for (let firstIndex = 0; firstIndex < arr.length - 2; firstIndex += 1) {
    for (
      let secondIndex = firstIndex + 1;
      secondIndex < arr.length - 1;
      secondIndex += 1
    ) {
      count = 2;
      let f1 = arr[firstIndex];
      let f2 = arr[secondIndex];
      let f3 = f1 + f2; // * 双遍历，获取 i-2 和 i-1
      while (set.has(f3)) {
        console.log(f1, f2, f3);
        count += 1;
        if (count > max) max = count;
        f1 = f2;
        f2 = f3;
        f3 = f1 + f2;
      }
    }
  }
  return max;
}

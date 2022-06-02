/**
 * 计数排序
 *
 * 除了空间复杂度大，其他都还好
 *
 * @param arr
 * @param maxValue
 * @returns
 */
function countingSort(arr: any[], maxValue: number) {
  const bucket = new Array(maxValue - 1);
  let sortedIndex = 0;
  const arrLen = arr.length;
  const bucketLen = maxValue + 1;

  for (let i = 0; i < arrLen; i++) {
    if (!bucket[arr[i]]) {
      bucket[arr[i]] = 0;
    }
    bucket[arr[i]]++;
  }

  for (let j = 0; j < bucketLen; j++) {
    while (bucket[j] > 0) {
      arr[sortedIndex++] = j;
      bucket[j]--;
    }
  }

  return arr;
}

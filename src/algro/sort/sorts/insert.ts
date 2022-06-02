function insertSort(arr: any[]) {
  // ! 从 1 开始遍历，因为要往前对比 let i = 1 i < arr.length
  for (let i = 1; i < arr.length; i += 1) {
    // * 往前遍历，直到找到需要插入的位置，也就是前面的数字比自己小
    // ! let j = i; j >= 1; j -= 1
    for (let j = i; j >= 1; j -= 1) {
      if (arr[j] < arr[j - 1]) {
        // * 往前插入，所以 j - 1 和 j 交换，每个更大的前数都需要被交换
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
      }
    }
  }

  return arr;
}
console.log(insertSort([3, 6, 1, 2, 7, 3, 5, 0, 1, 0]));

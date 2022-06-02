import { swap, comparator } from "./index";

/**
 * 冒泡排序
 * @param arr
 * @returns
 */
export function bubbleSort(arr: any[]) {
  let swapped = true;

  // * 需要交换，就进行交换
  // * 最后一次遍历，不会产生交换 ，说明都是正确顺序，退出循环
  while (swapped) {
    swapped = false;

    // * 正序遍历数组，一次完整 for 循环为一次正序遍历
    // * 每次遍历，都存在一个 最大/小项（通过改变comparator，来决定最大最小） 下沉到末尾
    for (let i = 0; i < arr.length; i++) {
      if (comparator(arr[i], arr[i + 1])) {
        swap(arr, i, i + 1);
        swapped = true;
      }
    }
    // 因为我们始终是从首项开始顺序迭代，并且始终比较相邻两项，那么若此时顺序迭代完整个
    // 列表，且没有发生交换，那么此时的 swapped 变量为 false，即表示经历了从首项到末
    // 项的每相邻的两项都满足 comparator(a, b) 函数，即表示完成了整个列表的排序，此时
    // 将跳出 while 循环
  }
  console.log(arr);
  return arr;
}

bubbleSort([3, 6, 1, 2, 7, 3, 5]);
// 复习
function bubble(arr: any[]) {
  let swapped = true;

  while (swapped) {
    swapped = false;

    for (let i = 0; i < arr.length - 1; i += 1) {
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1);
        swapped = true;
      }
    }
  }

  console.log(arr);
}
bubble([3, 6, 1, 2, 7, 3, 5, 0, 1, 0]);

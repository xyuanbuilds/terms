/**
 * 选择排序
 *
 * @type 原地排序
 *
 * * 因为原地排序，i - j 交换会打乱原顺序，所以是不稳定的
 * * 如果用一个额外数组去 push 没次的最小值，则可变为稳定
 *
 * 每 i 一次遍历，选择出一个最小值的Index，放在i，通过不断的选择剩余元素的最小值实现排序
 * @see https://en.wikipedia.org/wiki/Selection_sort
 */

import { swap, comparator } from "./index";

export function selectionSort(list: number[]) {
  // * n 此遍历
  for (let i = 0; i < list.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < list.length; j++) {
      if (comparator(list[minIndex], list[j])) {
        minIndex = j;
      }
    }
    swap(list, i, minIndex);
  }
  return list;
}

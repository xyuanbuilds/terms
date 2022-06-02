/**
 * 剑指 Offer II 075. 数组相对排序
 * [*]
 * 循环 arr2 partition 剩余快排
 *
 * 最好使用计数排序
 * https://leetcode-cn.com/problems/0H97ZC/solution/javascript-jie-fa-by-lancer-o9-jfkl/
 */
export function relativeSortArray(arr1: number[], arr2: number[]): number[] {
  let next = 0;
  for (let what of arr2) {
    next = insert(arr1, what, next);
  }

  if (next < arr1.length) {
    quick(arr1, next, arr1.length - 1);
  }
  return arr1;
}

const relativeSortArray1 = (arr1, arr2) => {
  const [left, right] = [[], []];
  const [len1, len2] = [arr1.length, arr2.length];
  for (let i = 0; i < len2; i++) {
    for (let j = 0; j < len1; j++) {
      if (arr1[j] === arr2[i]) {
        left.push(arr1[j]);
        arr1[j] = null;
      }
    }
  }

  for (let i = 0; i < len1; i++) {
    arr1[i] !== null && right.push(arr1[i]);
  }

  right.sort((a, b) => a - b);
  return [...left, ...right];
};

function quick(nums: number[], left: number, right: number) {
  const pIndex = partition(nums, left, right); // 从左往右遍历，排列 left 位置数到它该放置的位置
  if (pIndex === null) {
    return;
  }
  quick(nums, left, pIndex - 1);
  quick(nums, pIndex + 1, right);
}

function partition(nums: number[], l: number, r: number) {
  if (l >= r) {
    return null;
  }
  let pivot = nums[l];
  let should = l;
  for (let i = l + 1; i <= r; i += 1) {
    if (nums[i] < pivot) {
      should += 1;
      [nums[i], nums[should]] = [nums[should], nums[i]];
    }
  }

  [nums[l], nums[should]] = [nums[should], nums[l]];

  return should;
}

function insert(arr: any[], what: number, to: number) {
  let next = to;
  for (let i = to; i < arr.length; i += 1) {
    if (arr[i] === what) {
      swap(arr, next, i);
      next += 1;
    }
  }

  return next;
}

function swap(arr: any[], l: number, r: number) {
  [arr[l], arr[r]] = [arr[r], arr[l]];
}

// const arr1 = [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19];
// const arr2 = [2, 1, 4, 3, 9, 6];
const arr1 = [33, 22, 48, 4, 39, 36, 41, 47, 15, 45];
const arr2 = [22, 33, 48, 4];
relativeSortArray(arr1, arr2);

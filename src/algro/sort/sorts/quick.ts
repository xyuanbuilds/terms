function swap(arr: any[], l: number, r: number) {
  [arr[l], arr[r]] = [arr[r], arr[l]];
}
/**
 *
 * @param {*} arr 数组
 * @param {*} p 起始下标
 * @param {*} r 结束下标 + 1
 */
function quick2(nums: number[], left: number, right: number) {
  const pIndex = partition(nums, left, right); // 从左往右遍历，排列 left 位置数到它该放置的位置
  if (pIndex === null) {
    return;
  }
  quick2(nums, left, pIndex - 1);
  quick2(nums, pIndex + 1, right);
}

function partition(nums: number[], l: number, r: number) {
  // * 特殊情况返回
  if (l >= r) {
    return null;
  }
  // * nums[l]，获取基准点，开头的元素为基准点，等待插入正确位置
  let pivot = nums[l];
  // * 最后 l 应该去到的位置
  let should = l;

  // * 从 l + 1 开始遍历，包含 r
  for (let i = l + 1; i <= r; i += 1) {
    // * 每有一个元素在 比 l 小就应该在 l 的左侧多一个，所以 should += 1;
    // * 同时将小的位置放到 should 处
    if (nums[i] < pivot) {
      should += 1;
      [nums[i], nums[should]] = [nums[should], nums[i]];
    }
  }

  // * 遍历完成后，将原先的基准元素放到它该放置的位置
  // * 也就是 l 和 should 进行交换
  [nums[l], nums[should]] = [nums[should], nums[l]];

  return should;
}

const a = [3, 6, 1, 2, 7, 0, 1];
// quick(a, 0, 9);
console.log(a);

export function quick(arr: any[]) {
  if (arr.length <= 1) return arr;

  let pivotIndex = arr.length >> 1;
  // * 取出一个基准值，让这个基准值去到它该去的位置
  let pivot = arr.splice(pivotIndex, 1)[0];

  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] <= pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quick(left).concat(pivot, quick(right));
}
// quick2(a, 0, a.length - 1);
// console.log(a);

// 复习
function quick3(arr: any[], l: number, r: number) {
  // if (arr.length === 1) return;

  const done = partition1(arr, l, r);
  if (done === null) return;

  quick3(arr, l, done - 1); // 注意 l
  quick3(arr, done + 1, r); // 注意 r
}

function partition1(arr: any[], l: number, r: number): null | number {
  // ! 注意此处的边界处理，不处理回栈溢出
  if (l >= r) {
    return null;
  }
  const p = arr[l];
  let should = l;

  for (let i = l + 1; i <= r; i += 1) {
    if (arr[i] < p) {
      should += 1;
      swap(arr, should, i);
    }
  }

  swap(arr, l, should);

  return should;
}
quick3(a, 0, a.length - 1);

console.log(a);

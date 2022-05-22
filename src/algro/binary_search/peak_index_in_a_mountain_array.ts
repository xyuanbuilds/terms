/**
 * 852. 山脉数组的峰顶索引
 *
 * 双指针，稍慢
 */
function peakIndexInMountainArray1(arr: number[]): number {
  let l = 0;
  let r = arr.length - 1;
  let max = Math.max(arr[l], arr[r]);
  let res = arr[l] > arr[r] ? l : r;
  r -= 1;
  l += 1;
  while (l < r) {
    if (arr[l] > arr[r]) {
      if (max < arr[l]) {
        max = arr[l];
        res = l;
      }
    } else {
      if (max < arr[r]) {
        max = arr[r];
        res = r;
      }
    }
    l += 1;
    r -= 1;
  }

  return (arr.length & 1) === 1 ? (arr[l] > max ? l : res) : res;
}

function peakIndexInMountainArray(arr: number[]): number {
  const n = arr.length;
  let l = 1,
    r = n - 1;
  while (l < r) {
    const mid = (l + r + 1) >> 1;

    // if (arr[l] >= arr[mid]) {
    //   l = mid;
    // } else {
    //   r = mid - 1;
    // }
    // * 由于 峰顶两侧具有有序，所以不能直接用 l 对比 mid
    // * 但 峰顶 左侧一定 < 峰顶，所以可以用 l 来 安全逼近结果，用 r 来获取结果
    if (arr[mid - 1] < arr[mid]) {
      l = mid;
    } else {
      r = mid - 1;
    }
  }
  return r;
}

peakIndexInMountainArray([0, 10, 5, 2]);

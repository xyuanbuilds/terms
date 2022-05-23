/**
 * 560. 和为 K 的子数组
 * [?]
 * * 哈希表记录的是当前下标结尾的前缀和，
 * * 如果前缀和 - k的 差 能在哈希表中找到，
 * * 说明至少有一个子数组满足条件。
 * 如[3,4,7,2,-3,1,7,4,2]，哈希表中有一个前缀为14出现了2次的元素([3,4,7],[3,4,7,2,-3,1])，
 * 则以第二个7结尾的满足条件的子数组有2种组合：[2,-3,1,7],[7]
 *
 * 连续的叫子数组
 * @param nums
 * @param k
 */
function subarraySum(nums: number[], k: number): number {
  let cnt = 0;
  let itemsSum = 0;
  let extraSum = 0;
  let map = new Map(); // * 记录前缀和

  map.set(0, 1);

  for (let i = 0; i < nums.length; i++) {
    itemsSum += nums[i]; // * 0 - i 的 sum
    extraSum = itemsSum - k; // * 当前 0 -i 的 sum - k
    // * k = itemSum - extraSum

    console.log("map", extraSum, map.get(extraSum));

    if (map.has(extraSum)) {
      // * 有 extraSum 这个前缀，说明减掉这个前缀，后面的到 i 部分能够满足条件
      cnt += map.get(extraSum);
    }

    map.set(itemsSum, (map.get(itemsSum) || 0) + 1);
  }
  console.log(cnt);
  return cnt;
}
// 输入：nums = [1,1,1,1,1,1], k = 3
// 输出：2
subarraySum([1, 1, 1, 1, 1, 1], 3);

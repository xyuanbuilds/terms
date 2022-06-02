/**
 * 78. 子集
 * [*]
 *
 * 与排列不同，要求返回幂集，也就是不存在重复的，所以需要改变for的start
 *
 * @param nums
 */
function subsets(nums: number[]): number[][] {
  const res: number[][] = [];
  function backTrack(nums: number[], start: number, tmp: number[]) {
    console.log(tmp);
    res.push([...tmp]);

    for (let i = start; i < nums.length; i += 1) {
      tmp.push(nums[i]);
      backTrack(nums, i + 1, tmp);
      tmp.pop();
    }
  }

  backTrack(nums, 0, []);
  return res;
}
subsets([1, 2, 3]);
//  []
//  [ 1 ]
//  [ 1, 2 ]
//  [ 1, 2, 3 ]
//  [ 1, 3 ]
//  [ 2 ]
//  [ 2, 3 ]
//  [ 3 ]
//
// 输入：nums = [1,2,3]
// 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

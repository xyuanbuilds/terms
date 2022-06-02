/**
 * 46. 全排列
 * [*] 回溯套路
 *
 *
 *
 * @param nums
 */
function permute(nums: number[]): number[][] {
  const res: number[][] = [];

  function backTrack(tmp: number[]) {
    if (tmp.length === nums.length) {
      res.push([...tmp]);
      return;
    }

    for (let num of nums) {
      if (tmp.find((i) => i === num) !== undefined) continue;

      tmp.push(num);
      backTrack(tmp);
      tmp.pop();
    }
  }
  backTrack([]);
  console.log(res);
  return res;
}
permute([0, 1]);

// 输入：nums = [1,2,3]
// 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

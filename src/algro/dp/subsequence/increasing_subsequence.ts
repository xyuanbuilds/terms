/**
 * 491. 递增子序列
 * @param nums
 */
function findSubsequences(nums: number[]): number[][] {
  const cache = new Map();

  function backtrack(start: number, tmp: number[]) {
    for (let i = start; i < nums.length; i += 1) {
      if (tmp.length > 0 && nums[i] < tmp[tmp.length - 1]) continue; // 跳出/减枝

      // * push 与 pop 成对
      tmp.push(nums[i]);
      if (tmp.length > 1) cache.set(tmp.toString(), [...tmp]);
      backtrack(i + 1, tmp);
      tmp.pop();

      // for (let i = start; i < nums.length; i += 1) {
      //   const prev = tmp[tmp.length - 1]; // 上一个选择，即path数组的末尾元素
      //   const cur = nums[i]; // 当前选择
      //   if (tmp.length == 0 || prev <= cur) {
      //     // 如果path为空，或满足递增关系，则可选择
      //     tmp.push(cur); // 选择当前的数字
      //     backtrack(i + 1, tmp); // 继续往下递归，注意传的是i+1
      //     tmp.pop(); // 撤销选择当前数字，选择别的数字
      //   }
      // }
    }
  }

  // const dfs = (start: number, path: number[]) => {
  //   if (path.length >= 2) {
  //     const str = path.toString(); // path数组 转成字符串
  //     if (!set.has(str)) {         // set中没有存有当前path
  //       res.push(path.slice());    // 推入一份path的拷贝
  //       set.add(str);              // 存入set，记录一下
  //     }
  //   }
  //   for (let i = start; i < len; i++) {      // 枚举出当前所有的选项，从start到末尾
  //     const prev = path[path.length - 1];    // 上一个选择，即path数组的末尾元素
  //     const cur = nums[i];                   // 当前选择
  //     if (path.length == 0 || prev <= cur) { // 如果path为空，或满足递增关系，则可选择
  //       path.push(cur);                      // 选择当前的数字
  //       dfs(i + 1, path);                    // 继续往下递归，注意传的是i+1
  //       path.pop();                          // 撤销选择当前数字，选择别的数字
  //     }
  //   }
  // };

  backtrack(0, []);

  return Array.from(cache.values());
}

// 输入：nums = [4,4,3,2,1]
// 输出：[[4,4]]
findSubsequences([4, 4, 3, 2, 1]);
// findSubsequences([4, 6, 7, 7]);

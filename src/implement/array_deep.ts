const arrayDepth = function (p: any[]) {
  // * 求dep，dep跟随递归变化，所以作为参数
  const help = function (arr: any[], dep: number): number {
    // * maxDeep 全程唯一，所以直接用闭包/参数记录
    let max = dep;
    for (let val of arr) {
      if (Array.isArray(val)) {
        // * 递归处理max
        max = Math.max(help(val, dep + 1), max);
      }
    }

    return max;
  };

  return help(p, 1);
};

console.log(arrayDepth([[1], [[1, 2]], [[[[1, 2, 3]]]]]));

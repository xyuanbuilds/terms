/**
 * 版本号由小到大
 * 样例输入：versions = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']
 * 输出：['0.1.1', '0.302.1', '2.3.3', '4.3.4.5', '4.3.5']
 *
 * * 关键记忆点
 * * sort 排序时 a-b 表示大的在后面，-(a-b) 表示大的在前面
 */

// 0.1.1.1
// 0.1.1

// 0.1.1
// 0.2.1

const versionSort = (arr: string[]) => {
  return arr.sort((a, b) => {
    const aArr = a.split(".");
    const bArr = b.split(".");

    for (
      let i = 0;
      i < (aArr.length > bArr.length ? bArr.length : aArr.length);
      i += 1
    ) {
      if (aArr[i] !== bArr[i]) {
        return Number(aArr[i]) - Number(bArr[i]);
      }
    }

    return aArr.length - bArr.length;
  });
};

const versionSortRes = versionSort([
  "0.1.1",
  "2.3.3",
  "0.302.1",
  "4.2",
  "4.3.5",
  "4.3.4.5",
]);
console.log(versionSortRes);

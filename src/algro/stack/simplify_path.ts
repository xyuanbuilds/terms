/**
 * 71. 简化路径
 * 始终以斜杠 '/' 开头。
 * 两个目录名之间必须只有一个斜杠 '/' 。
 * 最后一个目录名（如果存在）不能 以 '/' 结尾。
 * 此外，路径仅包含从根目录到目标文件或目录的路径上的目录（即，不含 '.' 或 '..'）。
 *
 * * 主要处理 `..` 的跳出，由于先进的先出，所以用栈
 *
 * @param path
 */
function simplifyPath(path: string): string {
  const dir = path.split("/");
  const stack: string[] = [];

  for (let name of dir) {
    // * 当前目录或无效空格，直接去除
    if (name === "." || name === "") continue;
    // * 返回上一个目录，说明前一个有记录的路径需要跳出
    // * 如果没有路径，则不需要跳出
    if (name === "..") {
      stack.length && stack.pop();
      continue;
    }
    // * 其他正常入栈
    stack.push(name);
  }

  // * 最后拼接
  return "/" + stack.join("/");
}

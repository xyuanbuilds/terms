export function parseParam(url: string) {
  const paramsStr = /.+\?(.+)$/.exec(url); // 将 ? 后面的字符串取出来
  // const paramsStr = url.replace(/.+\?(.+)$/, "$1"); // 将 ? 后面的字符串取出来，也可用replace 取

  // if (paramsStr === url) return null;
  if (!paramsStr) return null;
  // const paramsArr = paramsStr.split("&"); // 将字符串以 & 分割后存到数组中
  const paramsArr = paramsStr[1].split("&"); // 将字符串以 & 分割后存到数组中

  let paramsObj = {};
  // 将 params 存到对象中
  paramsArr.forEach((param) => {
    if (/=/.test(param)) {
      // 处理有 value 的参数
      let [key, val] = param.split("="); // 分割 key 和 value
      val = decodeURIComponent(val); // 解码
      // val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字

      if (paramsObj.hasOwnProperty(key)) {
        // 如果对象有 key，则添加一个值
        paramsObj[key] = new Array<any>().concat(paramsObj[key], val);
      } else {
        // 如果对象没有这个 key，创建 key 并设置值
        paramsObj[key] = val;
      }
    } else {
      // 处理没有 value 的参数
      paramsObj[param] = true;
    }
  });
  debugger;
  return paramsObj;
}
const test =
  "https://github.com/mqyqingfeng/Blog/issues/show_menu_content?partial=issues%2Ffilters%2Flabels_content&q=is%3Apr+is%3Aopen";
parseParam(test);

// * 参数在 ? 后，所以用 ?(.+)$ 来捕获
const paramStr = /.+\?(.+)$/.exec(test)?.[1];
console.log(paramStr);
// * 之后每个参数用 & 分割，取出参数分段
const paramArr = paramStr!.split("&");
// * 再查看是否有 = ,有则是 key-value 没有则是 key
let paramsObj = {};
paramArr.forEach((param) => {
  if (/=/.test(param)) {
    const [key, value] = param.split("=");
    // * decodeURIComponent
    paramsObj[key] = decodeURIComponent(value);
  } else {
    // * 单纯的 key
    paramsObj[param] = true;
  }
});

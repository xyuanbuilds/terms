function parseParam(url: string) {
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
parseParam(
  "https://github.com/mqyqingfeng/Blog/issues/show_menu_content?partial=issues%2Ffilters%2Flabels_content&q=is%3Apr+is%3Aopen"
);

function get(source, path, defaultValue = undefined) {
  // a[3].b -> a.3.b
  const paths = path
    // * replace 回调用法，第一个参数是正则匹配成功的字符串段，第二个参数是正则捕获的内容
    .replace(/\[(\d+)\]/g, (_, index) => {
      return `.${index}`;
    })
    .split(".");

  let result = source;
  for (const p of paths) {
    result = Object(result)[p];
    if (result === undefined) {
      return defaultValue;
    }
  }
  return result;
}

console.log(get({ a: { b: [1] } }, "a.b[0]"));

// * 另外，有了可选链之后，就不再需要使用 loadash.get 了

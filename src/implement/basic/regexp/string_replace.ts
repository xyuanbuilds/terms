// 123ab456cd 替换成 ab123cd456
/**
 * Strs replace
 *
 * * 1. 正则表达式携带 g，以实现所有匹配的替换
 * * 2. 替换后存在空格，去除空格
 * @param str
 * @returns
 */
function strReplace(str: string) {
  return str.replace(/([0-9]*)([a-z]*)/g, "$2 $1").replace(/\s/g, "");
}

console.log(strReplace("123ab456cd")); // ab123cd456

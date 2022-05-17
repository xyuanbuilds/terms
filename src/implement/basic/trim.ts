// str.replace(/^\s*/, "").replace(/\s*$/, "");
/**
 * trim 可以循环遍历字符串来实现，最好使用正则实现
 * 
 * * x|y：匹配‘x’或者‘y’。 例如，/green|red/匹配“green apple”中的‘green’和“red apple”中的‘red’
 * * 此处添加了 g 全匹配标识，不添加只会替换掉开头的空格
 * 
 * @param str 
 * @returns 
 */
function trim(str: string) {
	return str.replace(/^\s+|\s+$/g, "");
}
/**
 * 更多 replace 使用如：
 * 交换：选中$1、$2 后，将他们交换
 * "as df d".replace(/(as).?(d)/, '$2 $1') // 'd asf d'
 */

// const res = trim(" sdfs dfdfd ");
// console.log(res);

/**
 * * [1, [2, [3]]].flat(2)  // [1, 2, 3]
 * @param arr 
 * @returns 
 */
function flatten(arr: any[]) {
	while (arr.some((item) => Array.isArray(item))) {
		arr = [].concat(...arr);
	}
	return arr;
}
// 链接：https://juejin.cn/post/6946022649768181774

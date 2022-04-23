/**
 * 461
 * 两个数 二进制位不同的数目
 * 
 * 异或使用
 * 左移动相当于 Math.floor(n / 2)
 * https://leetcode-cn.com/problems/hamming-distance/solution/javascriptwei-yun-suan-jie-fa-by-zhu-zhu-xia-6/
 */
function hammingDistance(x: number, y: number) {
	let ans = 0;
	while (x !== 0 || y !== 0) {
		if ((x & 1) !== (y & 1)) {
			ans++;
		}
		x >>= 1;
		y >>= 1;
	}
	return ans;
}

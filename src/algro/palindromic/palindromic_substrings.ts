/**
 * 647. 回文子串
 * 
 * * 动态规划，从尾部开始遍历
 * 
 * * 情况一：下标i 与 j相同，同一个字符例如a，当然是回文子串
 * * 情况二：下标i 与 j相差为1，例如aa，也是文子串
 * * 情况三：下标：i 与 j相差大于1的时候，例如 `cabac`，此时s[i]与s[j]已经相同了，
 * * 我们看i到j区间是不是回文子串就看aba是不是回文就可以了，
 * * 那么aba的区间就是 i+1 与 j-1区间，这个区间是不是回文就看dp[i + 1][j - 1]是否为true。
 * 
 */
function countSubstrings(s: string): number {
	const dp = Array.from(Array(s.length), () => Array(s.length).fill(false));
	let result = 0;

	// * i 为 left，j 为 right
	// * 从右往左扩散，
	for (let i = s.length - 1; i >= 0; i--) {
		// 注意遍历顺序
		for (let j = i; j < s.length; j += 1) {
			if (s[i] == s[j]) {
				if ((j - i) <= 1) {
					// 情况一 和 情况二
					// 情况一 和 情况二
					result++;
					dp[i][j] = true;
				} else if (dp[i + 1][j - 1]) {
					// 情况三
					// 情况三
					result++;
					dp[i][j] = true;
				}
			}
		}
	}

	return result;
}

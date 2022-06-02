/**
 * 338 
 * 
 * 位运算 左移动
 * 
 * 普通解：循环计算进位
 * 
 * 另外也可以 DP
 */
function countBits(n: number): number[] {
	let str = [0];
	const res = [0];
	let start = 1;
	while (start <= n) {
		const tail = str[0];
		if (tail === 0) {
			str[0] = 1;
			res.push(res[res.length - 1] + 1);
		} else {
			let i = 0;
			let tmp = res[res.length - 1];
			let need = false;
			while (i < str.length) {
				if (str[i] === 0) {
					str[i] = 1;
					tmp += 1;
					break;
				} else {
					str[i] = 0;
					tmp -= 1;
				}
				i += 1;

				if (i === str.length) {
					need = true;
				}
			}
			if (need) {
				str.push(1);
				tmp += 1;
			}
			res.push(tmp);
		}

		start += 1;
	}

	return res;
}

// const res = countBits1(5);
/**
 * 偶数是相当于被某个更小的数乘2，等于偶数+1 **左移一位**，在低位多加1个0（不影响结果），那样就说明偶数dp[i] = dp[i / 2]
 * 奇数由偶数+1得到，偶数+1 会在低位多加1个1，那样就说明dp[i] = dp[i-1] + 1，当然也可以写成dp[i] = dp[i / 2] + 1
 */
function countBits1(num: number) {
	let ans = Array(num + 1).fill(0);
	for (let i = 1; i <= num; i++) {
		if ((i % 2) === 0) {
			ans[i] = ans[Math.floor(i / 2)];
		} else {
			ans[i] = ans[Math.floor(i / 2)] + 1;
		}
	}
	return ans;
}

/**a
 * 120. 三角形最小路径和
 * [*]
 * 
 * * 最终都会走到 dp[0][0]，所以结果是自底向上获得的
 * * dp[i][j] 的结果由下层的 j 和 j + 1 决定
 * 
 * dp 需要自底向上
 */
function minimumTotal(triangle: number[][]): number {
	const layers = triangle.length;
	const dp: number[][] = Array(layers).fill(0).map(() => []);

	for (let l = layers - 1; l >= 0; l -= 1) {
		const layer = triangle[l];
		for (let i = 0; i < layer.length; i += 1) {
			if (l === (layers - 1)) {
				dp[l][i] = layer[i];
			} else {
				dp[l][i] = Math.min(dp[l + 1][i], dp[l + 1][i + 1]) + layer[i];
			}
		}
	}

	return dp[0][0];
}

function minimumTotal1(triangle: number[][]) {
	const bottom = triangle[triangle.length - 1];
	const dp = new Array(bottom.length);
	// base case 是最后一行
	for (let i = 0; i < dp.length; i++) {
		dp[i] = bottom[i];
	}
	// 从倒数第二列开始迭代
	for (let i = dp.length - 2; i >= 0; i--) {
		for (let j = 0; j < triangle[i].length; j++) {
			dp[j] = Math.min(dp[j], dp[j + 1]) + triangle[i][j];
		}
	}
	return dp[0];
}

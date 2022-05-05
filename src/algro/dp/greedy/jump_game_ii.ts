/**
 * 45 跳跃游戏 2
 */
function jump(nums: number[]): number {
	let curEnd = 0;
	let farest = nums[0];
	let step = 0;

	for (let i = 0; i < (nums.length - 1); i += 1) {
		// ! 走到末尾，不是走出，所以 < nums.length - 1
		const num = nums[i];
		farest = Math.max(num + i, farest);
		if (farest >= (nums.length - 1)) {
			return step + 1;
		}
		if (curEnd === i) {
			step += 1;
			curEnd = farest;
		}
	}
	return step;
}

export { jump };

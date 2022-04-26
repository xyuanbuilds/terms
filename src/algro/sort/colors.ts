/**
 * 75  颜色分类
 * 
 * 双指针，快排partition
 * 
 * 循环不变量
 * https://leetcode-cn.com/problems/sort-colors/solution/kuai-su-pai-xu-partition-guo-cheng-she-ji-xun-huan/
 * 
 * 左指针全是 0，右指针全是 2，这样每次 i 遍历遇到 0 / 2 交换 i 与 左/右，左/右 移动一位，，最终左右两指针逼近。
 * all in [0, zero) = 0
 * all in [zero, i) = 1
 * all in [two, len - 1] = 2
 */
function sortColors(nums: number[]) {
	let zero = -1, i = 0, two = nums.length;
	while (i < two) {
		if (nums[i] == 0) {
			swap(nums, ++zero, i++);
		} else if (nums[i] == 2) {
			swap(nums, i, --two);
		} else {
			i++;
		}
	}
}
function swap(arr: any[], a: number, b: number) {
	[arr[a], arr[b]] = [arr[b], arr[a]];
}

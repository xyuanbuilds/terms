// ! 合集
// ! https://github.com/lbwa/algorithms/tree/main/sorts

/**
 * 稳定的算法 **冒泡算法** **插入排序** **归并排序**
 * 不稳定的算法 快速排序 希尔排序 堆排序
 */

// 冒泡排序
// * 每一次完整遍历，会让未排序的最末尾完成排序
function bubbleSort(arr: any[]) {
	for (var i = arr.length - 1; i > 0; i--) {
		for (var j = 0; j < i; j++) {
			if (arr[j] > arr[j + 1]) {
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
			}
		}
	}
}
// 选择排序
function selectSort(arr: any[]) {
	for (var i = 0; i < arr.length; i++) {
		var min = i;
		for (var j = i; j < arr.length; j++) {
			if (arr[j] < arr[min]) {
				min = j;
			}
		}
		[arr[i], arr[min]] = [arr[min], arr[i]];
	}
}

// 插入排序
function insertSort(arr: any[]) {
	for (var i = 1; i < arr.length; i++) {
		var temp = arr[i];
		var j = i;
		while (j > 0 && arr[j - 1] > temp) {
			arr[j] = arr[j - 1];
			j -= 1;
		}
		arr[j] = temp;
	}
	return arr;
}

// 希尔排序
function shellSort(arr: any[]) {
	var gaps = [5, 3, 1];
	for (var i = 0; i < gaps.length; i++) {
		for (var j = gaps[i]; j < arr.length; j++) {
			var temp = arr[j];
			var j = i;
			while (j > 0 && arr[j - gaps[i]] > temp) {
				arr[j] = arr[j - gaps[i]];
				j -= gaps[i];
			}
			arr[j] = temp;
		}
	}
	return arr;
}

// 动态希尔排序
function dynamicShellSort(arr: any[]) {
	var gap = 1;
	while (gap < (arr.length / 3)) {
		gap = (gap * 3) + 1;
	}
	while (gap >= 1) {
		for (var j = gap; j < arr.length; j++) {
			var temp = arr[j];
			var j = i;
			while (j > 0 && arr[j - gap] > temp) {
				arr[j] = arr[j - gap];
				j -= gap;
			}
			arr[j] = temp;
		}
		gap = (gap - 1) / 3;
	}
	return arr;
}

// 归并排序
function mergeSort(arr: any[]) {
	var step = 1;
	while (step < arr.length) {
		var left = 0;
		var right = step;
		while ((right + step) <= arr.length) {
			mergeFn(arr, left, left + step, right, right + step);
			left = right + step;
			right = left + step;
		}
		if (right < arr.length) {
			mergeFn(arr, left, left + step, right, arr.length);
		}
		step *= 2;
	}
}

function mergeFn(arr, leftStart, leftStop, rightStart, rightStop) {
	var leftArr = arr.slice(leftStart, leftStop);
	var rightArr = arr.slice(rightStart, rightStop);
	var l = 0;
	var r = 0;
	for (var k = leftStart; k < rightStop; k++) {
		if (leftArr[l] < rightArr[r]) {
			arr[k] = leftArr[l];
			l++;
		} else {
			arr[k] = rightArr[r];
			r++;
		}
	}
}

// 快速排序
// * 详细快速排序
// * https://github.com/sl1673495/daily-plan/issues/33
function quickSort(arr: any[]) {
	if (arr.length == 0) {
		return [];
	}
	var left = [];
	var right = [];
	var base = arr[0];
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] < base) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}
	return quickSort(left).concat(base, quickSort(right));
}
// 选择排序
// 从前往后 拿当前位置的值与剩余的值去比较 找到最值 和当前位置进行交换

// 插入排序
// 假设当前值的前面的都是有序的 在前面 找到大于本值的 向后移动它 找到比自己小的 就和它交换

// 希尔排序
// 按照递减的间隔 进行插入排序 减少移动次数

// 归并排序
// 分治法 把大问题变成小问题

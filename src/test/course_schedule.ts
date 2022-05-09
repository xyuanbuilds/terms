/**
 * 207. 课程表
 * [*]
 * 
 * 尝试遍历并记录生成课程链，失败，发现不能这么做
 * 
 * 先搞清楚，这里不仅仅是单向的树结构的关系，而是可能存在环的 **有向图**
 * 
 * 所以得先遍历关系对，获取：
 * 1. 每个点点入度，以获取哪些点是入度为 0 的 **顶点**（最底下的，只出无入）；
 * 2. 获取邻接关系，也就是 a -> b, c -> b, { b: [a, c]}，a，c 是 b 的入度；
 * 
 * 0 -> 3, 1 -> 3, 1 -> 4, 2 -> 4, 3 -> 5, 4 -> 5
 * 
 *      5
 *     / \
 *    3   4
 *   / \ / \
 *  0   1   2
 * 
 * 此时的 0，1，2 就是入度为 0 的 顶点；
 *  
 * 入度数组：课号 0 到 n - 1 作为索引，通过遍历先决条件表求出对应的初始入度。
 * 邻接表：用哈希表记录依赖关系（也可以用二维矩阵，但有点大）
 * 		key：课号
 * 		value：依赖这门课的后续课（数组）
 * 
 * 是否能上完所有课，也就是从底向上的 BFS，每次都去除顶点，如果能去除完则能上完，不能则说明有点不是顶点
 * 
 * 另外也有一种 DFS 直接验证是否有环的方法：
 * https://leetcode-cn.com/problems/course-schedule/solution/course-schedule-tuo-bu-pai-xu-bfsdfsliang-chong-fa/
 */
// function canFinish(numCourses: number, prerequisites: number[][]): boolean {
// 	let res = "";

// 	// for (let pair of prerequisites) {
// 	//   const l = pair[0];
// 	//   const r = pair[1];

// 	//   const findL = res.includes(String(l));
// 	//   const findR = res.includes(String(r));

// 	//   if (findL && findR){ continue; } else if (findL) {

// 	//   } else if findR {

// 	//   }
// 	// }

// 	const map = new Map<number, number>();

// 	for (let pair of prerequisites) {
// 		map.set(pair[0], pair[1]);
// 	}

// 	let res = "";
// 	for (let i = 0; i < numCourses; i += 1) {}
// }

function canFinish(numCourses: number, prerequisites: number[][]) {
	const inDegree = new Array(numCourses).fill(0); // 入度数组

	const map = {}; // 邻接表

	for (let i = 0; i < prerequisites.length; i++) {
		const need = prerequisites[i][1];
		const can = prerequisites[i][0];
		inDegree[can]++; // 求课的初始入度值，也就是能修这门课，得先修哪些课
		if (map[need]) {
			// 当前课已经存在于邻接表
			map[need].push(can); // 添加依赖它的后续课
		} else {
			// 当前课不存在于邻接表
			map[need] = [can];
		}
	}

	const queue: number[] = [];
	for (let i = 0; i < inDegree.length; i++) {
		// 所有入度为0的课入列
		if (inDegree[i] == 0) {
			queue.push(i);
		}
	}

	let count = 0;
	while (queue.length) {
		const selected = queue.shift()!; // 当前选的课，出列
		count += 1; // 选课数+1
		const toEnQueue = map[selected]!; // 获取这门课对应的后续课
		if (toEnQueue && toEnQueue.length) {
			// 确实有后续课
			for (let i = 0; i < toEnQueue.length; i++) {
				inDegree[toEnQueue[i]]--; // 依赖它的后续课的入度-1
				if (inDegree[toEnQueue[i]] == 0) {
					// 如果因此减为0，入列
					queue.push(toEnQueue[i]);
				}
			}
		}
	}
	return count == numCourses; // 选了的课等于总课数，true，否则false
}

canFinish(6, [[3, 0], [3, 1], [4, 1], [4, 2], [5, 3], [5, 4]]);
// 输入：numCourses = 2, prerequisites = [[1,0],[0,1]]
// 输出：false

/**
 * 61. 旋转链表
 * 
 * 获得长度后，根据计算获得行进步数，连接首尾，行进后再断开
 * 
 * @param head 
 * @param k 
 * @returns right 
 */
function rotateRight(head: ListNode | null, k: number): ListNode | null {
	if (head === null) {
		return head;
	}

	let tail = head;
	let len = 1;
	while (tail.next !== null) {
		len += 1;
		tail = tail.next;
	}

	tail.next = head;
	const done = k % len;
	let steps = Math.abs((done === 0 ? len : done) - len);
	debugger;
	while (steps > 0) {
		tail = tail.next!;
		steps -= 1;
	}

	head = tail.next;
	tail.next = null;

	return head;
}
// [3, 4, 5, 1, 2];
// const ttt = {
// 	val: 1,
// 	next: {
// 		val: 2,
// 		next: { val: 3, next: { val: 4, next: { val: 5, next: null } } },
// 	},
// };

// rotateRight(ttt, 2);

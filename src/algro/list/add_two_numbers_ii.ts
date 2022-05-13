/**
 * 445. 两数相加 II
 * [*] 链表与栈
 * 
 * 可以翻转后做两数运算，注意循环完进位的情况
 * * 也可借助栈，这样先入，后出，就可以从尾部开始输出了
 */
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null):
	| ListNode
	| null {
	if (l1 === null || l2 === null) {
		return l1 || l2;
	}

	let l: ListNode | null = reverseList(l1);
	let r: ListNode | null = reverseList(l2);

	let head: ListNode | null = null;
	let more = false;
	while (l !== null || r !== null) {
		let cur;
		if (l === null) {
			cur = r!.val;
			r = r!.next;
		} else if (r === null) {
			cur = l.val;
			l = l.next;
		} else {
			cur = l.val + r.val;
			l = l.next;
			r = r.next;
		}
		if (more) {
			cur += 1;
			more = false;
		}
		if (cur >= 10) {
			more = true;

			const newNode: ListNode = { val: cur - 10, next: head };
			head = newNode;
		} else {
			const newNode: ListNode = { val: cur, next: head };
			head = newNode;
		}
	}

	if (more) {
		return { val: 1, next: head };
	}

	return head;
}
function reverseList(node: ListNode): ListNode {
	//* 处理 null 与，递归到最后一位的情况
	if (node.next === null) {
		return node;
	}

	// * 递归到链表底部，最后一位为头部
	const last = reverseList(node.next);
	// * 后续的后续指向自己也就是，自己与后续互指，
	node.next.next = node;
	// * 然后断开原先指向后续
	node.next = null;
	return last;
}
// l1 = [7,2,4,3], l2 = [5,6,4]
// 输出：[7,8,0,7]

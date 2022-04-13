import type { IPointer } from "../../types/Ipointer";

interface ListNode<T> extends IPointer<T> { next: ListNode<T> | null }
/** 反转链表 */
export function reverse(head: ListNode<unknown> | null):
	| ListNode<unknown>
	| null {
	if (head === null || head.next === null) {
		return head;
	}

	const last = reverse(head.next);
	head.next.next = head;
	head.next = null;
	return last;
}

let successor: ListNode<unknown> | null = null;

/** 反转链表前 n 位 */
export function reverseN(head: ListNode<unknown>, i: number): ListNode<unknown> {
	if (!head || head.next === null) {
		return head;
	}
	if (i === 1) {
		successor = head.next;
		return head;
	}
	const last = reverseN(head.next, i - 1);
	head.next.next = head;
	head.next = successor;

	return last;
}

// 反转 2-n 其实就是反转 1.next 的 2-1 到 n-1，也就是对于 2 为head 的前 n 位
var reverseBetween = function (
	head: ListNode<unknown>,
	left: number,
	right: number,
) {
	if (!head || head.next === null) {
		return head;
	}

	if (left === 1) {
		return reverseN(head, right - left + 1);
	}
	head.next = reverseBetween(head.next, left - 1, right - 1);

	return head;
};

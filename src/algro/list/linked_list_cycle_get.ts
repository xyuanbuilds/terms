/**
 * 142 环形链表2
 * [*]
 * * 快慢指针
 * 
 * 链表求环，并返回交汇点
 * 关键词：链表、环
 * 快慢指针：双指针的一种，存在环的链表，快慢指针必定在未来交汇
 *
 * 同时这里要求返回交汇点，快慢指针的情况下，快指针会走慢指针双倍的量
 * 从相遇点到入环点的距离加上 n-1 圈的环长，恰好等于从链表头部到入环点的距离
 *
 * 普通解决也是 set，while 链表的同时放入set，第一个重复的则为交汇点
 */
function detectCycle(head: ListNode | null): ListNode | null {
	// *
	if (!head || head.next === null) {
		return null;
	}
	// * 两元素直接得环
	if (head === head.next.next) {
		return head;
	}

	let quick: ListNode | null = head.next.next;
	let slow: ListNode | null = head.next;

	let has = false;
	while (quick && quick.next) {
		if (quick === slow) {
			has = true;
			break;
		}
		quick = quick.next.next;
		slow = slow!.next;
	}

	if (!has) {
		return null;
	}

	quick = head;
	while (slow != quick) {
		slow = slow!.next;
		quick = quick!.next;
	}
	return quick;
}
// [-1, -7, 7, -4, 19, 6, -9, -5, -2, -5];
// const a: ListNode = { val: -1, next: null };
// const b: ListNode = { val: -7, next: null };
// const c: ListNode = { val: 7, next: null };
// const d: ListNode = { val: -4, next: null };
// const e: ListNode = { val: 19, next: null };
// const f: ListNode = { val: 6, next: null };
// const g: ListNode = { val: -9, next: null };
// const h: ListNode = { val: -5, next: null };
// const i: ListNode = { val: -2, next: null };
// const j: ListNode = { val: -5, next: null };

// a.next = b;
// b.next = c;
// c.next = d;
// d.next = e;
// e.next = f;
// f.next = g;
// g.next = h;
// h.next = i;
// i.next = j;
// j.next = g;

// detectCycle(a);

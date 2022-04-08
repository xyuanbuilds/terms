/**
 * 链表求环
 * 关键词：链表、环
 * 快慢指针：双指针的一种，存在环的链表，快慢指针必定在未来交汇
 */
function hasCycle(head: ListNode | null): boolean {
  if (!head || head.next === null) return false;

  if (!head.next.next) {
    return head.next.val === head.val;
  }

  let quick: ListNode | null = head.next.next;
  let slow: ListNode | null = head.next;

  while (quick && quick.next) {
    if (quick === slow) return true;
    quick = quick.next.next;
    slow = slow!.next;
  }

  return false;
}

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// const a: ListNode = { val: 3, next: null };
// const b: ListNode = { val: 2, next: null };
// const c: ListNode = { val: 0, next: null };
// const d: ListNode = { val: -4, next: null };

// a.next = b;
// b.next = c;
// c.next = d;
// d.next = b;

// hasCycle(a);

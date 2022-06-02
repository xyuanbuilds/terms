/**
 * 链表求环
 * 关键词：链表、环
 * 快慢指针：存在环的链表，快慢指针必定在未来交汇
 */
function hasCycle(head: ListNode | null): boolean {
  if (!head || head.next === null) return false;

  let quick: ListNode | null = head;
  let slow: ListNode | null = head;

  while (quick && quick.next) {
    quick = quick.next.next;
    slow = slow!.next;

    if (quick === slow) return true;
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

import type { IPointer } from "../../types/Ipointer";

interface ListNode<T> extends IPointer<T> {
  next: ListNode<T> | null;
}
// * 翻转链表，右侧为开区间，如果是翻转整条，最后一个 cur 就是 null
function reverse1(
  head: ListNode<any> | null,
  end: ListNode<any> | null = null
) {
  let pre = null;
  let cur = head;

  // * 如果是翻转到底，判断，cur !== null
  while (cur !== end) {
    const nxt = cur!.next; // * 下一个进行翻转操作的节点
    cur!.next = pre;

    pre = cur; // * 完成翻转的节点，为下一个被指向的节点
    cur = nxt;
  }

  return pre;
}
/** 翻转链表 */
export function reverse(
  head: ListNode<unknown> | null
): ListNode<unknown> | null {
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
// 1 -> 2 -> 3 -> 4, 3
// reN(1.next = 2, 2)
// reN(2.next = 3, 1)
// successor = 4, return 3
// 3 -> 2 -> 4 // * successor 在回溯的过程中被传递
// 2 -> 1 -> 4
// 最终 3 -> 2 -> 1 -> 4
export function reverseN(
  head: ListNode<unknown>,
  i: number
): ListNode<unknown> {
  if (!head || head.next === null) {
    return head;
  }
  //* 反转完成到最后一位，后面都是不需要反转的
  //* 反转完成此时的 node 即是 head
  if (i === 1) {
    successor = head.next;
    return head;
  }
  const last = reverseN(head.next, i - 1);
  head.next.next = head;
  // * 最终需要指向不需要反转的部分
  head.next = successor;

  return last;
}

// 反转 2-n 其实就是反转 1.next 的 2-1 到 n-1，也就是对于 2 为head 的前 n 位
export function reverseBetween(
  head: ListNode<unknown>,
  left: number,
  right: number
) {
  if (!head || head.next === null) {
    return head;
  }

  if (left === 1) {
    return reverseN(head, right - left + 1);
  }
  head.next = reverseBetween(head.next, left - 1, right - 1);

  return head;
}

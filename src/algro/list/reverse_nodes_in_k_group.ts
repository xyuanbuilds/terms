/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 *
 * 25. K 个一组翻转链表
 * [*]
 * 给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。
 *
 * k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
 * 你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。
 */

// * 翻转链表，右侧为开区间，如果是翻转整条，最后一个 cur 就是 null
function reverse(head: ListNode | null, end: ListNode | null = null) {
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

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  if (head === null) return head;

  // ! 翻转后，原先的头部，回变为尾部
  let a = head;
  let b: ListNode | null = head;

  // 获取区间 [0, k)，从 0 开始，所以遍历到 k - 1，中间都不为 null，则可以进行翻转
  for (let i = 0; i < k; i += 1) {
    if (b === null) return head; // * 不符合翻转要求了，直接返回 head
    b = b.next!;
  }

  const newHead = reverse(a, b); // * 做区间反转

  // reverse 结果为返回值，也就是递归获取每个区间的返回值，并通过 a（reverse后是当前段的尾部）链接
  a.next = reverseKGroup(b, k); // 递归获取 a -> b ->...

  return newHead; // * 返回最终翻转后的 头部
}

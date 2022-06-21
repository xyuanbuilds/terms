/**
 * 剑指 Offer 06. 从尾到头打印链表
 * @param head
 */
function reversePrint(head: ListNode | null): number[] {
  const stack = [];

  let cur = head;
  while (cur) {
    stack.push(cur.val);
    cur = cur.next;
  }

  return stack.reverse(); // * 典型一点可以压栈再出
}

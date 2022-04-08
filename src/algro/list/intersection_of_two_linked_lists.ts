/**
 * 160
 * 关键词：链表、交叉
 * 基础：set 记录已遍历内容，以验证是否存在交叉
 * 双指针：链表不同，走完步数不同，但若存在交叉，只要在完一条时另一条走，分别从两条链表头部开始的指针必定走到交叉处交汇
 */
function getIntersectionNode1(
  headA: ListNode | null,
  headB: ListNode | null
): ListNode | null {
  const iS = new Set();
  let e = headA;
  while (e) {
    iS.add(e);
    if (e.next === null) break;
    e = e.next;
  }

  let c = headB;
  while (c) {
    if (iS.has(c)) return c;
    if (c.next === null) break;
    c = c.next;
  }

  return null;
}

/**
 *
 */
function getIntersectionNode(
  headA: ListNode | null,
  headB: ListNode | null
): ListNode | null {
  if (headA === null || headB === null) {
    return null;
  }
  let pA: null | ListNode = headA,
    pB: null | ListNode = headB;
  while (pA !== pB) {
    pA = pA === null ? headB : pA.next;
    pB = pB === null ? headA : pB.next;
  }
  return pA;
}

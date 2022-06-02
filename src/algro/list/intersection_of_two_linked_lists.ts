/**
 * 160. 相交链表
 * [*]
 *
 * 关键词：链表、交叉
 * 基础：set 记录已遍历内容，以验证是否存在交叉
 * 双指针：链表不同，走完步数不同，但若存在交叉，只要在完一条时另一条走，分别从两条链表头部开始的指针必定走到交叉处交汇
 */
function getIntersectionNode1(
  headA: ListNode | null,
  headB: ListNode | null
): ListNode | null {
  const cache = new Set();
  let cur = headA;

  while (cur) {
    cache.add(cur);
    cur = cur.next;
  }

  cur = headB;
  while (cur) {
    if (cache.has(cur)) return cur;
    cur = cur.next;
  }

  return null;
}

/**
 * 单纯双指针，判断是否相交
 * [✅]
 */
function getIntersectionNode(
  headA: ListNode | null,
  headB: ListNode | null
): ListNode | null {
  if (headA === null || headB === null) {
    return null;
  }

  let pA: null | ListNode = headA;
  let pB: null | ListNode = headB;

  // * 只要不相同，就继续往下走，走完了换另一条走
  while (pA !== pB) {
    pA = pA === null ? headB : pA.next;
    pB = pB === null ? headA : pB.next;
  }

  // * 最终返回 null 或者相交点
  return pA;
}

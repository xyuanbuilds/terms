/**
 * 面试题 02.02. 返回倒数第 k 个节点
 * @param head
 * @param k
 * @returns
 */
function kthToLast(head: ListNode | null, k: number): number {
  let slow = head;
  let fast = head;

  let n = 0;
  while (fast && fast.next) {
    n += 1;
    slow = slow.next;
    fast = fast.next.next;
  }

  const all = fast ? 2 * n + 1 : 2 * n;
  const tar = all - k;
  if (n === tar) return slow.val;
  if (tar > n) {
    while (n !== tar) {
      n += 1;
      slow = slow.next;
    }
    return slow.val;
  } else {
    let cur = 0;
    while (cur !== tar) {
      cur += 1;
      head = head.next;
    }

    return head.val;
  }
}

/**
 * 143. 重排链表
 *
 * 0, 1, 2, ... n - 1, n
 * 0, n, 1, n - 1 ...
 *
 * @param head
 */
function reorderList(head: ListNode | null): void {
  if (head === null) return;

  let slow = head;
  let fast: ListNode | null = head;

  // * 快慢指针，获得中心点，偶数会获得中心右侧
  while (fast && fast.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }

  // * slow.next 及往后为需要插入的节点，并且要翻转后再插入
  const rHead = slow.next;
  slow.next = null;

  let forInsert = reverse(rHead);

  let cur = head;
  // * 翻转完后是插入流程，注意⚠️指针变化顺序
  //* 插入节点始终小于保留节点，肯定会全部消耗
  while (forInsert !== null) {
    //* 插入前先保留后续
    const tmp = cur.next;

    // * 插入
    cur.next = forInsert;

    // * 遍历指针指向插入的内容，准备接上后续
    cur = forInsert;

    // * 插入消耗了一个，往后指一个
    forInsert = forInsert.next;

    // * 插入的元素后面连上后续，同时也就断开了与插入链表的连接
    cur.next = tmp;

    //* 进入下一个原节点，继续准备插入
    cur = cur.next!;
  }

  return;
}

function reverse(node: ListNode) {
  let pre = null;
  let cur: ListNode | null = node;

  while (cur !== null) {
    const tmp: ListNode | null = cur.next;

    cur.next = pre;
    pre = cur;
    cur = tmp;
  }

  return pre;
}

/**
 * 2. 两数相加
 * @param l1
 * @param l2
 */
function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  let head: ListNode = { val: -1, next: null };

  let cur = head;
  let l: ListNode | null | undefined = l1;
  let r: ListNode | null | undefined = l2;
  let more = false;

  while (l || r) {
    let v = l?.val ?? 0 + (r?.val ?? 0);
    l = l?.next;
    r = r?.next;
    if (more) {
      v += 1;
      more = false;
    }
    if (v >= 10) {
      more = true;
    }

    cur.next = {
      val: v % 10,
      next: null,
    };
    cur = cur.next;
  }

  if (more) {
    cur.next = {
      val: 1,
      next: null,
    };
  }

  return head.next;
}

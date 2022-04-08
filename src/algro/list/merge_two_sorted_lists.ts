/**
 * 21
 * 可递归，引用交换
 */
function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  if (!list1 || !list2) return list1 || list2;

  let head, l, r;
  if (list1.val >= list2.val) {
    head = list2;
    l = list1;
    r = head.next;
  } else {
    head = list1;
    l = head.next;
    r = list2;
  }

  let t = head;
  while (l || r) {
    if (l && r) {
      if (l.val >= r.val) {
        t.next = r;
        r = r.next;
        t = t.next;
      } else {
        t.next = l;
        l = l.next;
        t = t.next;
      }
    } else {
      t.next = r || l!;
      t = t.next;
      if (r) {
        r = r.next;
      } else {
        l = l!.next;
      }
    }
  }

  return head;
}

// const tL11 = {
//   val: -9,
//   next: {
//     val: 3,
//     next: null,
//   },
// };
// const tL22 = {
//   val: 5,
//   next: {
//     val: 7,
//     next: null,
//   },
// };

// mergeTwoLists(tL11, tL22);

function mergeTwoListsRe(l1: ListNode | null, l2: ListNode | null) {
  if (l1 === null) {
    return l2;
  }
  if (l2 === null) {
    return l1;
  }
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
}

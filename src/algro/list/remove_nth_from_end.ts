/**
 * 19
 * 关键词：链表、倒数第几个
 * 快慢指针：可慢 n 步，让慢指针获得倒数 n 位置
 */
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  if (!head) return head;
  if (head.next === null) return null;

  let q = head.next.next;
  let s = head.next;
  let l = 2;
  let step = 1;
  // let oushu = true; // 偶数 s 为中点偏右，奇数为中点

  while (q) {
    if (q.next === null) {
      l += 1;
      // oushu = false;
      break;
    }
    step += 1;
    l += 2;
    q = q.next.next;
    s = s.next!;
  }

  let rL = l - (step + 1);

  if (n <= rL) {
    while (rL > n) {
      s = s.next!;
      rL -= 1;
    }
    s.next = s.next!.next || null;
  } else {
    let b = head;
    let t = 1;
    const i = l - n;
    while (t < i) {
      b = b.next!;
      t += 1;
    }

    if (i === 0) {
      return head.next;
    }
    if (i < 0) {
      return head;
    }

    b.next = b.next!.next || null;
  }

  return head;
}

function removeNthFromEnd1(head: ListNode | null, n: number) {
  if (!n || !head) {
    return head;
  }
  let cur: ListNode = head;
  let temp: ListNode | null = head;
  let pre = head;

  while (n) {
    temp = temp!.next;
    n--;
  }

  if (!temp) {
    head = head!.next;
    return head;
  }

  while (temp) {
    pre = cur;
    cur = cur.next!;
    temp = temp.next;
  }

  pre!.next = cur!.next;

  return head;
}

const tL = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4,
        next: {
          val: 5,
          next: null,
        },
      },
    },
  },
};
const tL2 = {
  val: 3,
  next: {
    val: 7,
    next: {
      val: 9,
      next: {
        val: 3,
        next: {
          val: 5,
          next: {
            val: 8,
            next: {
              val: 0,
              next: null,
            },
          },
        },
      },
    },
  },
};

const tL1 = {
  val: 1,
  next: {
    val: 2,
    next: null,
  },
};

removeNthFromEnd(tL2, 1);
debugger;

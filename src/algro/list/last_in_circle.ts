/**
 * 剑指 Offer 62. 圆圈中最后剩下的数字
 * @param n
 * @param m
 * @returns
 */

// @ts-nocheck
// ! 超时，特殊类题，仅作为链表练习
function lastRemaining(n: number, m: number): number {
  let all = 0;
  let head = {
    val: null,
    next: null,
  };
  let cur = head;

  while (all !== n) {
    cur.next = {
      val: null,
      next: null,
    };
    cur.val = all;
    all += 1;
    if (all !== n) {
      cur = cur.next;
    }
  }

  cur.next = head;
  let pre = cur;

  while (pre.next.val !== pre.val) {
    let time = 0;
    while (time < m - 1) {
      time += 1;
      pre = pre.next;
    }
    pre.next = pre.next.next;
  }

  return pre.val;
}

lastRemaining(5, 1);

// * 约瑟夫环问题
function lastRemaining1(n, m) {
  let ans = 0;
  for (let i = 2; i <= n; i++) {
    ans = (ans + m) % i;
  }
  return ans;
}

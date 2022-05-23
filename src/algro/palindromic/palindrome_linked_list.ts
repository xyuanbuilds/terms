/**
 * 234. 回文链表
 * [*] 快慢双指针 / 两次遍历 / 入栈再出 / 后序遍历
 *
 * 给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。
 * @param head
 */

/**
 * 快慢双指针
 * [✅]
 *
 * * fast && fast.next 为遍历条件，遍历的同时翻转链表用于后续比对
 * * fast 不为 null，slow 要多走一位
 *
 * @param head
 * @returns
 */
function isPalindrome(head: ListNode | null): boolean {
  if (head === null) return false;
  let slow: ListNode | null = head;
  let fast: ListNode | null = head; // 快慢指针对原链表进行遍历

  if (head!.next === null) return true;
  if (head!.next.next === null) return head.val === head.next.val;

  let reversed = null;
  while (fast && fast.next) {
    fast = fast.next.next;

    const tmp: ListNode = slow!.next!;
    slow!.next = reversed; // *指向pre
    reversed = slow; // * 记录pre，

    // slow = slow!.next;
    slow = tmp;
  }

  // * 画图理解
  // * fast 不指向 null，说明是奇数
  if (fast) {
    slow = slow!.next; // 奇数的话，前半部分 比 后半部分少一个，所以后半部分的 slow 指针要先往后指一位，才能开始下面的遍历
  }

  while (slow && reversed) {
    // 不同直接返回
    if (slow.val !== reversed.val) {
      return false;
    }
    slow = slow.next;
    reversed = reversed.next;
  }
  return true;
}

/**
 * 两次遍历
 * @param head
 * @returns
 */
function isPalindrome1(head: ListNode | null): boolean {
  if (!head) return true;

  let s = "",
    p = head;

  while (p) {
    s += p.val;
    p = p.next!;
  }
  //* 字符翻转比对
  if (s.split("").reverse().join("") === s) return true;
  else return false;
}

/**
 * 可以利用栈，但是需要遍历两次
 * @param head
 * @returns
 */
function isPalindrome2(head: ListNode | null): boolean {
  if (head === null) return false;

  let len = 0;
  let next = head;
  while (next !== null) {
    len += 1;
  }
  if (len === 1) return true;
  if (len === 2) return head.val === head.next!.val;

  const stack = [];
  const m = (len >> 1) - 1;

  let cur = head;

  for (let n = 0; n < len; n += 1) {
    if (n <= m) {
      stack.push(cur.val);
    } else if ((len & 1) === 0 ? n >= m + 1 : n > m + 1) {
      if (cur.val !== stack.pop()) return false;
    }
    cur = cur.next!;
  }

  return true;
}

/**
 * 后序遍历，回溯期比对，性能一般
 * [✅]
 * @param head
 * @returns
 */
function isPalindrome3(head: ListNode | null): boolean {
  if (head === null) return false;

  function traverse(node: ListNode | null): boolean {
    if (node === null) return true;

    let res = traverse(node.next);

    // * 一次 false 后序都为 false
    // * 回溯期， node 是从 尾部开始往前的，此时正好可以比对头跟尾
    res = res && node.val === head!.val;
    head = head!.next;

    return res;
  }
  return traverse(head);
}

// const test = {
//   val: 0,
//   next: { val: 1, next: { val: 1, next: null } },
// };

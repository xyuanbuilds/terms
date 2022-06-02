/**
 * 148 排序链表
 * [*]
 *
 * 归并排序
 *  （树形演化）可递归
 *    先拆分，q && q.next.next 获得中心点，l = head; r = s.next; 最终拆分为单元素的 l 和 r
 *    拆分后合并，在递归的回溯位置进行合并，从单元素最终合并为整链；
 *      合并则为 l、r 单边有项则继续遍历，小的/仅有的 元素 先和入结果链；
 *
 * 也可用堆排序
 * 还有自底向上的解法
 */
function sortList(head: ListNode | null): ListNode | null {
  if (!head || head.next === null) return head;
  // 使用快慢指针找到中间节点
  let slow: ListNode | null = head;
  let fast: ListNode | null = head.next;

  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
  }
  // 将链表分成两半并返回后半部分链表的头节点
  let newList = slow!.next;
  slow!.next = null;

  // * 对前后两个链表进行排序
  let left = sortList(head); // * 递归最后 head -> null
  let right = sortList(newList); // * 递归最后 head -> null

  let res = new ListNode(-1);
  let nHead = res;

  // * 合并链表只需要调整指针的指向
  // * 两个链表哪个节点的值小就先指向它
  // * 直到 left 和 right 指完
  while (left !== null && right !== null) {
    if (left.val < right.val) {
      nHead.next = left;
      left = left.next;
    } else {
      nHead.next = right;
      right = right.next;
    }
    nHead = nHead.next;
  }
  nHead.next = left === null ? right : left;

  return res.next;
}

export function sortList2(head: ListNode | null): ListNode | null {
  if (!head || !head.next) {
    return head;
  }
  let quick = head;
  let slow = head;
  while (quick && quick.next?.next) {
    quick = quick.next.next;
    slow = slow.next!;
  }
  let left: ListNode | null = head;
  let right: ListNode | null = slow.next;
  slow.next = null;
  left = sortList(left);
  right = sortList(right);

  return merge(left, right);
}

export function merge(left: ListNode | null, right: ListNode | null) {
  let dummy: ListNode = { val: 0, next: null };
  let prev: ListNode | null = dummy;
  while (left || right) {
    const leftVal = left?.val ?? null;
    const rightVal = right?.val ?? null;

    let node = null;
    if (leftVal === null) {
      node = right;
      right = right!.next;
    } else if (rightVal === null) {
      node = left;
      left = left!.next;
    } else {
      if (leftVal < rightVal) {
        node = left;
        left = left!.next;
      } else {
        node = right;
        right = right!.next;
      }
    }
    if (prev) {
      prev.next = node;
      prev = node;
    }
  }
  return dummy.next;
}

function sortList1(head: ListNode | null): ListNode | null {
  if (!head) {
    return null;
  }

  let dummyHead = new ListNode(NaN, head);
  let current = head.next;
  let lastSorted = head;

  while (current) {
    // 如果比排序的最后一个节点值还大，直接接到尾部
    if (lastSorted.val < current.val) {
      lastSorted = lastSorted.next!;
    } else {
      let prev = dummyHead;
      while (prev.next!.val < current.val) {
        prev = prev.next!;
      }
      // 将尾部的指针指向当前节点的下一个节点
      lastSorted.next = current.next;
      current.next = prev.next;
      prev.next = current;
    }

    current = lastSorted.next;
  }

  return dummyHead.next;
}

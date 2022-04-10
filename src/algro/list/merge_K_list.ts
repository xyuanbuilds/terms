import { MinHeap } from "../../internal/Heap/min_heap";

/**
 * 23
 *
 * 直接合并，循环 list 每次合并当前需要的内容
 */
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  let done = false;
  const dummyHead: ListNode = { val: -1, next: null };
  let res = dummyHead;

  let cur = Number.MAX_SAFE_INTEGER; // 当前最小值
  let nextLists: ListNode[] = [];
  for (let list of lists) {
    const curV = list?.val ?? null;
    if (curV !== null) {
      cur = Math.min(cur, curV);
      nextLists.push(list!);
    }
  }

  if (nextLists.length === 0) return null;

  while (!done) {
    const curLayer = nextLists;
    nextLists = [];

    let nextCur = Number.MAX_SAFE_INTEGER;
    for (let curL of curLayer) {
      let p = curL;

      // 当前想找的 推入
      if (p.val === cur) {
        res.next = {
          val: p.val,
          next: null,
        };
        res = res.next;

        if (curL.next !== null) {
          nextCur = Math.min(curL.next.val, nextCur);
          nextLists.push(curL.next);
        }
      } else {
        nextCur = Math.min(nextCur, p.val);
        nextLists.push(curL);
      }
    }

    cur = nextCur;

    if (nextLists.length === 0) {
      done = true;
    }
  }

  // console.log(dummyHead);

  return dummyHead.next;
}

/**
 * 比较搞笑的是，直接推入数组排序，速度反而很快
 */
function mergeKLists1(lists: Array<ListNode | null>) {
  const list = [];
  for (let i = 0; i < lists.length; i++) {
    let node = lists[i];
    while (node) {
      list.push(node.val);
      node = node.next;
    }
  }
  list.sort((a, b) => a - b);
  const res = new ListNode();
  let now = res;
  // console.log(list)
  for (let i = 0; i < list.length; i++) {
    now.next = new ListNode(list[i]);
    now = now.next;
  }
  return res.next;
}

function mK(lists: Array<ListNode | null>) {
  const pq = new MinHeap<ListNode>((a, b) => {
    return a.val - b.val;
  });
  // 构造一个新的链表头节点(第一个节点设置为0，避免空节点等情况)
  let dummyHead: ListNode = {
    val: -1,
    next: null,
  };
  let p = dummyHead;

  // 插入所有list的头节点
  for (let list of lists) {
    if (list) pq.insert(list);
  }
  // 将目前队列中的节点进行比较、将最小的追加在原链表后
  while (pq.size) {
    const temp = pq.pop();
    p.next = temp!;
    p = p.next!;
    // temp 表示 本轮比较中最小的头节点
    // temp.next 表示这个链表中的下一个节点
    if (temp!.next) pq.insert(temp!.next);
  }

  return dummyHead.next;
}

const testL: ListNode[] = [];

[
  [1, 4, 5],
  [1, 3, 4],
  [2, 6],
].forEach((l) => {
  const head = { val: -1, next: null };
  l.reduce<ListNode>((res, cur) => {
    res.next = {
      val: cur,
      next: null,
    };

    return res.next;
  }, head).next!;

  testL.push(head.next!);
});

// const res = mK(testL);

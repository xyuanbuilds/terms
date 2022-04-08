// 请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
// 实现 LRUCache 类：
// LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
// int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
// void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
// 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。

class ListNode {
  key: number;
  value: number;
  next: ListNode | null;
  prev: ListNode | null;
  constructor(key?: number, value?: number) {
    this.key = key !== undefined ? key : -1;
    this.value = value !== undefined ? value : -1;
    this.next = null;
    this.prev = null;
  }
}

/**
 * 双向链表
 *
 * dummy头尾，保证不会出现越界异常
 */
export class LRUCache {
  capacity: number;
  hash: Record<number, ListNode> = {};
  count: number = 0;
  dummyHead: ListNode; // 保证操作头部时 prev 有
  dummyTail: ListNode; // 保证操作尾部时 next 有

  constructor(capacity: number) {
    this.capacity = capacity;
    this.dummyHead = new ListNode();
    this.dummyTail = new ListNode();
    this.dummyHead.next = this.dummyTail;
    this.dummyTail.prev = this.dummyHead;
  }
  get(key: number) {
    let node = this.hash[key];
    if (node === undefined) return -1;
    this.moveToHead(node); // 最近使用，放到头部
    return node.value;
  }

  put(key: number, value: number) {
    let node = this.hash[key];
    if (node === undefined) {
      if (this.count == this.capacity) {
        // 达到容量上限，删除元素
        this.removeLRUItem();
      }
      let newNode = new ListNode(key, value);
      this.hash[key] = newNode;
      this.addToHead(newNode);
      this.count += 1;
    } else {
      node.value = value;
      this.moveToHead(node);
    }
  }

  moveToHead(node: ListNode) {
    this.removeFromList(node);
    this.addToHead(node);
  }

  removeFromList(node: ListNode) {
    let l = node.prev!;
    let r = node.next!;
    l.next = r;
    r.prev = l;
  }

  addToHead(node: ListNode) {
    node.prev = this.dummyHead;
    node.next = this.dummyHead.next;
    this.dummyHead.next!.prev = node; // 有 dummy
    this.dummyHead.next = node;
  }

  removeLRUItem() {
    // 尾部为最不常使用
    let tail = this.popTail();
    delete this.hash[tail.key];
    this.count--;
  }

  popTail() {
    let tail = this.dummyTail.prev!;
    this.removeFromList(tail);
    return tail;
  }
}

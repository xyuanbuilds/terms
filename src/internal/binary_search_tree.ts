import type { IPointer } from "../types/Ipointer";

// 插入过程也是查找过程
interface TreeNode<T> extends IPointer<T> {
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

class Node<T> implements TreeNode<T> {
  value: T;

  left: Node<T> | null;
  right: Node<T> | null;

  constructor(v: T) {
    this.value = v;
    this.left = null;
    this.right = null;
  }

  static make_node<T>(v: T) {
    return new Node(v);
  }

  get_child(factor: number) {
    return factor > 0 ? this.right : this.left;
  }
}

/**
 * 一颗树中，不存在两个相等的节点
 * 1: curNode > compareNode
 * 0: curNode = compareNode
 * -1: curNode < compareNode
 */
export type BSTreeComparator<T> = (
  curNodeValue: T,
  comparedNodeValue: T
) => number;

class BSTree<T> {
  protected _comparator: BSTreeComparator<T>;
  protected _root: Node<T> | null;

  size: number;

  constructor(comparator: BSTreeComparator<T>) {
    this._root = null;
    this._comparator = comparator;
    this.size = 0;
  }

  isEmpty() {
    return this._root === null;
  }

  insert(v: T) {
    const { isEmpty, _root, _comparator } = this;
    if (isEmpty()) {
      this._root = Node.make_node(v);
      this.size = 1;
      return true;
    } else {
      let cur = _root;
      let pre = null;
      while (cur !== null) {
        pre = cur;
        const res = _comparator(cur.value, v);
        if (res > 0) {
          cur = cur.right;
          if (cur === null) pre.right = Node.make_node(v);
        } else if (res < 0) {
          cur = cur.left;
          if (cur === null) pre.right = Node.make_node(v);
        } else {
          return false;
        }
      }

      return true;
    }
  }

  has(v: T) {
    const { _comparator, _root, isEmpty } = this;
    if (isEmpty()) return false;

    let cur = _root;
    while (cur !== null) {
      const res = _comparator(cur.value, v);
      if (res > 0) {
        cur = cur.right;
      } else if (res < 0) {
        cur = cur.left;
      } else {
        return true;
      }
    }

    return false;
  }

  static defaultComparator = (l: any, r: any) => l - r;

  static isValid<T>(
    root: Node<T>,
    comparator: BSTreeComparator<T> = BSTree.defaultComparator
  ): boolean {
    return this._isValidBST(root, null, null, comparator);
  }

  static _isValidBST<T>(
    root: Node<T> | null,
    min: T | null,
    max: T | null,
    comparator: BSTreeComparator<T>
  ): boolean {
    if (root === null) return true;

    if (min !== null && comparator(root.value, min) <= 0) {
      return false;
    }
    if (max !== null && comparator(root.value, max) >= 0) {
      return false;
    }

    return (
      // 对 left 来说，root 就是当前最大
      BSTree._isValidBST(root.left, min, root.value, comparator) &&
      // 对 right 来说，root 就是当前最小
      BSTree._isValidBST(root.right, root.value, max, comparator)
    );
  }
}

export default BSTree;

import type { IPointer } from "../../types/Ipointer";

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

  set_child(factor: number, value: T) {
    factor > 0
      ? (this.right = Node.make_node(value))
      : (this.left = Node.make_node(value));
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

type NoEmptyBSTree<T> = BSTree<T> & {
  _root: Node<T>;
};
class BSTree<T> {
  protected _comparator: BSTreeComparator<T>;
  protected _root: Node<T> | null;

  size: number;

  constructor(comparator: BSTreeComparator<T>) {
    this._root = null;
    this._comparator = comparator;
    this.size = 0;
  }

  isEmpty(this: BSTree<T>) {
    return this._root === null;
  }

  isNoEmpty(this: BSTree<T>): this is NoEmptyBSTree<T> {
    return this._root !== null;
  }

  insert(v: T) {
    const { _root, _comparator } = this;
    if (this.isEmpty()) {
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
          if (cur === null) {
            pre.right = Node.make_node(v);
            this.size += 1;
            return true;
          }
        } else if (res < 0) {
          cur = cur.left;
          if (cur === null) {
            pre.left = Node.make_node(v);
            this.size += 1;
            return true;
          }
        } else {
          return false;
        }
      }

      return false;
    }
  }

  has(v: T) {
    if (this.isNoEmpty()) {
      const { _comparator, _root } = this;
      let cur: null | Node<T> = _root;
      while (cur !== null) {
        const res = _comparator(cur.value, v);
        if (res !== 0) {
          cur = cur.get_child(res);
        } else {
          return true;
        }
      }
    }

    return false;
  }

  remove(v: T): boolean {
    let removed = false;
    this._remove(this._root, v, () => {
      removed = true;
      this.size -= 1;
    });
    return removed;
  }

  _remove(start: Node<T> | null, v: T, check: () => void): Node<T> | null {
    if (start === null) return start;
    const { _comparator, _remove } = this;

    const factor = _comparator(v, start.value);
    if (factor < 0) {
      start.right = _remove(start.right, v, check);
    } else if (factor > 0) {
      start.left = _remove(start.left, v, check);
    } else {
      if (start.left == null) {
        check();
        return start.right;
      }
      if (start.right == null) {
        check();
        return start.left;
      }

      let min = start.right;
      while (min.left) {
        min = min.left;
      }
      start.value = min.value; // 需要删除的节点与 删除节点右侧最小节点（右侧的最左边）换值
      start.right = _remove(start.right, min.value, check); // 换完值后删除被换值的节点
    }
    return start;
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

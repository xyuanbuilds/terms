/**
 * 相当于 236 二叉树公共父节点
 * 只是此处不是从root开始遍历，实际思想相同
 * 1. 递归处理
 * 2. set记录查重
 */
let box1 = document.querySelector("#box1");
let box2 = document.querySelector("#box2");

// 1.contains 递归
function findParentNode(
  node1: ParentNode | Element | null,
  node2: Element
): Element {
  if (node1 === null || node2 === null) return (node1 as Element) || node2!;

  if (node1.contains(node2)) {
    return node1 as Element;
  } else if (node2.contains(node1)) {
    return node2;
  } else {
    // 判断情况3，从其中一个节点往上查找，会找到一个共同的祖先节点
    return findParentNode(node1.parentNode, node2);
  }
}

function findParentNode1(node1, node2) {
  // * 找到所有 parent，然后用
  function findParent(node, parent = []) {
    if (!node.parentNode) return parent;
    parent.push(node.parentNode);
    return findParent(node.parentNode, parent);
  }

  let node1Parent = findParent(node1);
  let node2Parent = findParent(node2);

  let cache = new Set();

  for (let i of node1Parent) {
    cache.add(i);
  }

  // * 最近公共会是第一个重复的元素
  for (let i = 0; i < node2Parent.length; i++) {
    if (cache.has(node2Parent[i])) return node2Parent[i];
  }
}

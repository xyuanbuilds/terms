/**
 * 相同的树
 *
 * 1. BFS 查看每次queue中的元素是否相等，且即将推入queue的是否不等
 *
 * 2. DFS 同时比对两个节点
 *
 */
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (p === null || q === null) {
    return p === q ? true : false;
  }
  const queueP: TreeNode[] = [p];
  const queueQ: TreeNode[] = [q];

  while (queueP.length > 0 || queueQ.length > 0) {
    if (queueP.length !== queueQ.length) {
      return false;
    }

    const curP = queueP.length;

    for (let i = 0; i < curP; i += 1) {
      const cur1 = queueP.shift()!;
      const cur2 = queueQ.shift()!;

      if (cur1.val !== cur2.val) {
        return false;
      }
      if (cur1.left === null && cur2.left !== null) {
        return false;
      }
      if (cur1.right === null && cur2.right !== null) {
        return false;
      }
      if (cur1.left !== null && cur2.left === null) {
        return false;
      }
      if (cur1.right !== null && cur2.right === null) {
        return false;
      }
      if (cur1.left) {
        queueP.push(cur1.left);
      }
      if (cur1.right) {
        queueP.push(cur1.right);
      }
      if (cur2.left) {
        queueQ.push(cur2.left);
      }
      if (cur2.right) {
        queueQ.push(cur2.right);
      }
    }
  }

  return true;
}

function isSameTree1(p: TreeNode | null, q: TreeNode | null) {
  // 如果两个节点都是空节点 则肯定相同  如果两个节点只有一个节点为空
  if (p == null || q == null) {
    return p == q;
  }
  // 两个节点的值是否相同，只有相同才去递归比较左右子树
  return (
    p.val == q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
  );
}

function isSameTree2(p: TreeNode | null, q: TreeNode | null): boolean {
  let res = true;
  function DFS(node1: TreeNode | null, node2: TreeNode | null) {
    if (res === false || (node1 === null && node2 === null)) return;
    if ((node1 === null && node2) || (node2 === null && node1)) {
      res = false;
      return;
    }
    if (node1!.val === node2!.val) {
      DFS(node1!.left, node2!.left);
      DFS(node1!.right, node2!.right);
    } else {
      res = false;
      return;
    }
  }

  DFS(p, q);
  return res;
}

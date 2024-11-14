/**
 * 116. 填充每个节点的下一个右侧节点指针
 *
 * @param root
 * @returns
 */
function connect(root) {
  if (!root) return root;
  const traverse = (node1, node2) => {
    if (!node1 || !node2) return;
    node1.next = node2;

    traverse(node1.left, node1.right);
    traverse(node1.right, node2.left);
    traverse(node2.left, node2.right);
  };

  traverse(root.left, root.right);
  return root;
}

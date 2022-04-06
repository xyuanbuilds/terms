/**
 * 105
 */
function buildTree(preOrder: number[], inOrder: number[]): TreeNode | null {
  if (preOrder.length <= 1)
    return preOrder[0] ? { val: preOrder[0], left: null, right: null } : null;

  const root = preOrder[0];
  const rIndex = inOrder.findIndex((i) => i === root);
  const left = inOrder.slice(0, rIndex);
  const right = inOrder.slice(rIndex + 1);

  const tree = {
    val: root,
    left: buildTree(preOrder.slice(1, 1 + left.length), left),
    right: buildTree(preOrder.slice(1 + left.length), right),
  };

  return tree;
}

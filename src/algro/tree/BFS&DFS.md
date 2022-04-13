https://mp.weixin.qq.com/s?__biz=MzA5ODk3ODA4OQ==&mid=2648167212&idx=1&sn=6af5ffe5b69075b21bb4743ddcee4e7c&chksm=88aa236abfddaa7cae70b42edb299d0a52d9f1cc4fc1fdba1116972fc0ca0275b8bfdf10851b&token=1607921395&lang=zh_CN#rd
https://mp.weixin.qq.com/s?__biz=MzA5ODk3ODA4OQ==&mid=2648167208&idx=1&sn=d8118c7c0e0f57ea2bdd8aa4d6ac7ab7&chksm=88aa236ebfddaa78a6183cf6dcf88f82c5ff5efb7f5c55d6844d9104b307862869eb9032bd1f&token=1064083695&lang=zh_CN#rd

DFS（深度优先搜索）和 BFS（广度优先搜索）都可以用于遍历一颗树结构，如仅仅需要遍历一棵树、一张图上的所有结点的话，两种方式皆可。

某些使用场景是 DFS 做不到的，只能使用 BFS 遍历。如：「层序遍历」、「最短路径」。

# 模版

DFS 依靠 栈、循环，然后可以演化为用 递归 方便地实现。
递归可以隐藏栈操作，所以会简洁很多
```
dfs(root) {
    if (root == null) {
        return;
    }
    dfs(root.left);
    dfs(root.right);
}
```
BFS 依靠 队列、循环。
```
bfs(root) {
  queue = [];
  queue.add(root);

  while (!queue.isEmpty()) {

      node = queue.pop();

      if (node.left != null) {
          queue.add(node.left);
      }
      if (node.right != null) {
          queue.add(node.right);
      }
  }
}
```
# DFS
DFS 有两个要素：「访问相邻结点」和「判断 base case」


# BFS

## 层序

BFS 如果需要 **考虑层序**，则要在出队时一次性取出当前队中所有，会多一次循环。
```
bfs(root) {
  queue = [];
  queue.add(root);

  while (!queue.isEmpty()) {
    let size = queue.size(); // 每次遍历为当前一层

    for (let i = 0; i < size; i += 1) {
      node = queue.pop();

      if (node.left != null) {
          queue.add(node.left);
      }
      if (node.right != null) {
          queue.add(node.right);
      }
    }
  }
}
```

## 最短路径

> Dijkstra 算法解决的是 带权最短路径问题。BFS 则用于解决 无权最短路径问题，也可以看成每条边的权重都是 1。


## 多源 BFS
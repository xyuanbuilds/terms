/* 二叉树遍历框架 */
type BinaryTreeNode<T> = {
  value: T;
  left: BinaryTreeNode<T> | null;
  right: BinaryTreeNode<T> | null;
};

type MultiTreeNode<T> = {
  value: T;
  children: MultiTreeNode<T>[];
};

// 邻接表存储形式的图
/**
 * 表示一个图的类型。
 * @template T 图中节点的类型。
 */
type Graph<T> = {
  /**
   * 获取指定节点的邻居节点。
   * @param v 要获取邻居节点的节点。
   * @returns 节点 v 的邻居节点数组。
   */
  neighbors(v: T): T[];
};
class AdjacencyListGraph<T> implements Graph<T> {
  private adjacencyList: Map<T, T[]>;

  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(v: T): void {
    if (!this.adjacencyList.has(v)) {
      this.adjacencyList.set(v, []);
    }
  }

  addEdge(v1: T, v2: T): void {
    if (!this.adjacencyList.has(v1) || !this.adjacencyList.has(v2)) {
      throw new Error("Vertex does not exist in the graph");
    }

    const neighbors1 = this.adjacencyList.get(v1);
    const neighbors2 = this.adjacencyList.get(v2);

    if (neighbors1 && neighbors2) {
      neighbors1.push(v2);
      neighbors2.push(v1);
    }
  }

  neighbors(v: T): T[] {
    if (!this.adjacencyList.has(v)) {
      throw new Error("Vertex does not exist in the graph");
    }

    return this.adjacencyList.get(v) || [];
  }
}

const traverseBinaryTree = <T>(root: BinaryTreeNode<T> | null): void => {
  if (root === null) return;
  traverseBinaryTree(root.left);
  traverseBinaryTree(root.right);
};

const traverseMultiTree = <T>(root: MultiTreeNode<T> | null): void => {
  if (root === null) return;
  for (let i = 0; i < root.children.length; i++) {
    const child = root.children[i];
    traverseMultiTree(child);
  }
};

const traverseGraph = <T>(graph: Graph<T>, v: T): void => {
  const visited: Map<T, boolean> = new Map();
  const traverse = (v: T): void => {
    if (visited.get(v)) return;
    visited.set(v, true);
    for (let i = 0; i < graph.neighbors(v).length; i++) {
      const neighbor = graph.neighbors(v)[i];
      traverse(neighbor);
    }
  };
  traverse(v);
};

type IGraph = number[][];

/* 图遍历框架 */
const visited: boolean[] = [];
const traverse = function (graph: IGraph, vertex: number) {
  // 前序遍历位置，标记节点 v 已访问
  visited[vertex] = true;
  for (let neighbor of graph[vertex]) {
    if (!visited[neighbor]) {
      // 只遍历没标记过的相邻节点
      traverse(graph, neighbor);
    }
  }
};

function isBipartite(data: number[][]): boolean {
  const visited = [];
  const color = new Array(data.length).fill(false);
  let res = true;

  const traverseGraph = (graph, vertex) => {
    if (!res) return;

    const curColor = color[vertex];
    visited[vertex] = true;

    for (let neighbor of graph[vertex]) {
      console.log(neighbor);
      if (!visited[neighbor]) {
        // 只遍历没标记过的相邻节点
        color[neighbor] = !curColor;
        traverseGraph(graph, neighbor);
      } else {
        if (curColor === color[neighbor]) {
          res = false;
          return;
        }
      }
    }
  };

  for (let i = 0; i < data.length; i += 1) {
    if (!visited[i]) traverseGraph(data, i);
  }

  return res;
}

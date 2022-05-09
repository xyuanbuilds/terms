list

option

adaptor

extra: benchmark

more
algebraic effects
delimited continuation
exception
effects - state
pattern matching

https://github.com/jiayihu/pretty-algorithms
https://github.com/TSiege/Tech-Interview-Cheat-Sheet

真实案例：
https://www.educative.io/courses/decode-coding-interview-js?aff=K7qB

一些奇怪问题的答案：
https://github.com/lydiahallie/javascript-questions/blob/master/zh-CN/README-zh_CN.md


实际场景练习：
1. 文件夹遍历
2. 多级排序（排序稳定性？），原生 sort 排序存在不稳定性
   1. https://zhuanlan.zhihu.com/p/116046849
3. DP：搜索字符ABC。字符串 ABCABDCABC，高亮 ABC。
4. 背包：https://www.zhihu.com/question/63439215/answer/209657233

重新查看：
437 path_sum

more:
二分
贪心
DP
分治

最常见关键词：
DFS，BFS，动态规划，二叉树，链表，各种大模拟，*单调栈，排序方法，回溯，前缀和


根据需要处理的数据类型确认解决方式

字符：DP
数组：双指针
链表：快慢指针
网格：动态规划
   岛屿：寻找起始点+movesDFS（多源DFS）
      岛屿距离：寻找起始点+movesBFS（多源BFS）
   需要不与前选择冲突（记录访问过的内容）：回溯（标记已选择，或已访问）
区间：都得先排序，然后滑动窗口/贪心

背包：（是否选择（拿/不拿） + 剩余目标变化（重量/最大限制））从 1 开始循环
   0-1背包：选择物体数量确定
   完全背包：选择物体数量无限制

**分治
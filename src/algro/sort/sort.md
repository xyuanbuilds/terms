快排partition，及排序后，将排序操作后的元素放到它该放的地方（放置完后此处就是循环不变量），及左侧都比它小，右侧都比它大

为什么快排是 n Log n ?
https://blog.csdn.net/u011947630/article/details/104691611?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-104691611-blog-90744948.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-104691611-blog-90744948.pc_relevant_default&utm_relevant_index=1

因为与快排的基准值相关，基准值没次正好取在有序的中心，向下递归的调用栈就会比较浅，如果每次正好取在有序的最左，则会呈现最深的调用栈，也就是没次基准切分的 左，右 如果能平衡，复杂度就低(高度可能为 n/2)，不能就高(n)，然后每个递归层都处理 n 个数, 最差 N N，所以取平均值 N logN


// ! 合集
// ! https://github.com/lbwa/algorithms/tree/main/sorts
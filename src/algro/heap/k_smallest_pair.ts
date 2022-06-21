/**
 * 剑指 Offer II 061. 和最小的 k 个数对
 * 
 * https://leetcode.cn/problems/qn8gGX/solution/yi-bu-bu-si-kao-chu-bfs-you-xian-dui-lie-smel/
 * @param nums1
 * @param nums2
 * @param k
 */
// 神奇思路 bfs + 去重
function kSmallestPairs(
  nums1: number[],
  nums2: number[],
  k: number
): number[][] {
 const map = new Map();
 const arr = [[nums1[0], nums2[0]]];
 let x = 0;
 let y = 0;

 while (arr.length < k) {
   if (x + 1 >= nums1.length && y + 1 >= nums2.length) break;
   if (x + 1 < nums1.length) map.set(`${x + 1}_${y}`, nums1[x + 1] + nums2[y]);
   if (y + 1 < nums2.length) map.set(`${x}_${y + 1}`, nums1[x] + nums2[y + 1]);
   let sum = Infinity;
   let minKey = '';
   // 找到最小值
   map.forEach((value, key) => {
     if (value < sum) {
       sum = value;
       minKey = key;
     }
   });
   map.delete(minKey);
   const coord = minKey.split("_");
   x = Number(coord[0]) - 0;
   y = Number(coord[1]) - 0;
   arr.push([nums1[x], nums2[y]]);
 }
 return arr;
}

class MaxHeap {
    constructor(k){
        this.maxSize = k;
    }
    // 类属性
    size = 0;
    data = [null]; // 数组的第一个元素废弃，作为哨兵

    // 1. 插入： 从完全二叉树末尾插入元素，通过 上浮 找到对应的位置
    insert(arr) {
        let i = ++this.size; // i从1开始插入，因为 位置 0 是哨兵
        // 如果要插入的值大于父节点，就持续上沉
        while (i > 1 && this.data[i >> 1][0] < arr[0]) {
            // 找到合适的位置
            this.data[i] = this.data[i >> 1];
            i = i >> 1
        }
        this.data[i] = arr;
        if(this.size>this.maxSize) this.delete();
    }
    // 2.删除 ： 将堆尾 元素 temp 插入到 堆顶
    // 对于 temp 下沉有两种选择：
    // 1. 只有左节点，我们跟左节点进行比交，如果左节点更大，则替换\
    // 2. 同时具备左节点和右节点， 我们选择更大的进行替换
    delete() {
        // 堆空
        if (this.size < 1) return false;
        // saveItem 保存一下被删除的堆顶元素，最后将要返回出去
        const saveItem = this.data[1];
        // 获取堆尾元素 -- 将它置为 堆顶 
        const temp = this.data.pop();
        this.size--;
        let parent = 1; // parent 代表 temp 当前所处的位置， 因为 temp 替换到了堆顶，所以当前它是 1 
        // 将新的对顶元素下沉 , 如果 parent*2 说明 parent 还有左子节点, 判断是否需要替换
        while (parent * 2 <= this.size) {
            // 左子节点 = parent * 2 , 右子节点 = parent * 2 + 1
            let child = parent * 2;
            // 判断一下 右儿子的 存在 
            // 1. 没右儿子，将 temp 与 当前元素进行比较
            // 2. 同时存在 左右儿子， 取两者间最大的进行比较
            if (child != this.size && this.data[child][0] < this.data[child + 1][0]) child++; // 左 ———> 右
            if (temp[0] >= this.data[child][0]) break; // 如果 temp 比左右子节点中的 最大值 还要大，则位置合适，循环中止
            else this.data[parent] = this.data[child]; // 否则 将 temp 的子节点 与 temp 替换位置
            // 并进行下一层循环
            parent = child
        }
        this.data[parent] = temp; // 找到对应位置后，循环中断，将 temp 的值存储到 当前位置
        return saveItem;
    }
}

import { Heap } from "../../internal/Heap/min_heap";
/**
 * 347 前K高频
 * [*] 优先队列
 *
 * 优先队列练习
 *
 * 普通解：循环记录出现次数，再根据map中记录的内容排序获得高->低顺序（此处可以使用优先队列）
 */
function topKFrequent(nums: number[], k: number): number[] {
  const map: Record<string, number> = {};
  for (let num of nums) {
    map[num] = map[num] ? map[num] + 1 : 1;
  }

  const sorted = Object.entries(map).sort((a, b) => {
    return b[1] - a[1];
  });

  const res: number[] = [];
  for (let i = 0; i < k; i += 1) {
    res.push(Number(sorted[i][0]));
  }

  return res;
}
function topKFrequent1(nums: number[], k: number): number[] {
  const map: Record<string, number> = {};
  for (let num of nums) {
    map[num] = map[num] ? map[num] + 1 : 1;
  }

  const comp = (a: [string, number], b: [string, number]) => {
    return b[1] - a[1];
  };

  const maxH = new Heap<[string, number]>(comp);

  Object.entries(map).forEach((i) => {
    maxH.insert(i);
  });

  const res: number[] = [];

  for (let i = 0; i < k; i += 1) {
    res.push(Number(maxH.pop()![0]));
  }

  return res;
}

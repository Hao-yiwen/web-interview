// ============================================
// 堆
// ============================================

// ------------------------------------------
// 1. 数组中的第K个最大元素 (Kth Largest Element in an Array) [中等]
// ------------------------------------------
// 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
// 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
// 你必须设计并实现时间复杂度为 O(n) 的算法解决此问题。
//
// 示例 1：
//   输入：nums = [3,2,1,5,6,4], k = 2
//   输出：5
//
// 示例 2：
//   输入：nums = [3,2,3,1,2,4,5,5,6], k = 4
//   输出：4

function findKthLargest(nums: number[], k: number): number {
  function quickSelect(l: number, r: number): number {
    const pivot = nums[r]; let p = l;
    for (let i = l; i < r; i++) if (nums[i] >= pivot) [nums[i], nums[p]] = [nums[p++], nums[i]];
    [nums[p], nums[r]] = [nums[r], nums[p]];
    if (p === k - 1) return nums[p];
    return p < k - 1 ? quickSelect(p + 1, r) : quickSelect(l, p - 1);
  }
  return quickSelect(0, nums.length - 1);
}

// ------------------------------------------
// 2. 数据流的中位数 (Find Median from Data Stream) [困难]
// ------------------------------------------
// 中位数是有序整数列表中间的数。如果列表的大小是偶数，则没有中间值，中位数是两个中间值的平均值。
// 例如：
// - [2,3,4] 的中位数是 3
// - [2,3] 的中位数是 (2 + 3) / 2 = 2.5
// 设计一个支持以下两种操作的数据结构：
// - void addNum(int num) - 从数据流中添加一个整数到数据结构中。
// - double findMedian() - 返回目前所有元素的中位数。
//
// 示例：
//   输入：["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
//         [[], [1], [2], [], [3], []]
//   输出：[null, null, null, 1.5, null, 2.0]
//   解释：
//     addNum(1)    -> [1]
//     addNum(2)    -> [1, 2]
//     findMedian() -> 1.5
//     addNum(3)    -> [1, 2, 3]
//     findMedian() -> 2.0

// 小根堆
class MinHeap {
  private heap: number[] = [];
  get size() { return this.heap.length; }
  peek() { return this.heap[0]; }

  push(val: number) {
    this.heap.push(val);
    let i = this.heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.heap[p] <= this.heap[i]) break;
      [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
      i = p;
    }
  }

  pop(): number {
    const top = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      let i = 0;
      while (true) {
        let s = i, l = 2 * i + 1, r = 2 * i + 2;
        if (l < this.heap.length && this.heap[l] < this.heap[s]) s = l;
        if (r < this.heap.length && this.heap[r] < this.heap[s]) s = r;
        if (s === i) break;
        [this.heap[s], this.heap[i]] = [this.heap[i], this.heap[s]];
        i = s;
      }
    }
    return top;
  }
}

// 大根堆：存负数取巧实现
class MaxHeap {
  private h = new MinHeap();
  get size() { return this.h.size; }
  peek() { return -this.h.peek(); }
  push(val: number) { this.h.push(-val); }
  pop() { return -this.h.pop(); }
}

class MedianFinder {
  private lo = new MaxHeap();  // 大根堆，存较小的一半
  private hi = new MinHeap();  // 小根堆，存较大的一半

  addNum(num: number): void {
    this.lo.push(num);
    this.hi.push(this.lo.pop());
    if (this.lo.size < this.hi.size) {
      this.lo.push(this.hi.pop());
    }
  }

  findMedian(): number {
    if (this.lo.size > this.hi.size) return this.lo.peek();
    return (this.lo.peek() + this.hi.peek()) / 2;
  }
}

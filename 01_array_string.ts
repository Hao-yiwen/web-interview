// ============================================
// 数组 / 字符串
// ============================================

// ------------------------------------------
// 1. 合并两个有序数组 (Merge Sorted Array) [简单]
// ------------------------------------------
// 给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n，
// 分别表示 nums1 和 nums2 中的元素数目。
// 请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。
// 注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。
// 为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，
// 后 n 个元素为 0，应忽略。nums2 的长度为 n。
//
// 示例 1：
//   输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
//   输出：[1,2,2,3,5,6]
//
// 示例 2：
//   输入：nums1 = [1], m = 1, nums2 = [], n = 0
//   输出：[1]
//
// 示例 3：
//   输入：nums1 = [0], m = 0, nums2 = [1], n = 1
//   输出：[1]

function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  let i = nums1.length - 1;
  m = m - 1;
  n = n - 1;
  while (m >= 0 && n >= 0) {
    if (nums1[m] > nums2[n]) {
      nums1[i--] = nums1[m--];
    } else {
      nums1[i--] = nums2[n--];
    }
  }
  while (m >= 0) nums1[i--] = nums1[m--];
  while (n >= 0) nums1[i--] = nums2[n--];
}

// ------------------------------------------
// 2. 移除元素 (Remove Element) [简单]
// ------------------------------------------
// 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素。
// 元素的顺序可能发生改变。然后返回 nums 中与 val 不同的元素的数量。
// 假设 nums 中不等于 val 的元素数量为 k，你需要执行以下操作：
// - 更改 nums 数组，使 nums 的前 k 个元素包含不等于 val 的元素。
//   nums 的其余元素和 nums 的大小并不重要。
// - 返回 k。
//
// 示例 1：
//   输入：nums = [3,2,2,3], val = 3
//   输出：2, nums = [2,2,_,_]
//
// 示例 2：
//   输入：nums = [0,1,2,2,3,0,4,2], val = 2
//   输出：5, nums = [0,1,4,0,3,_,_,_]

function removeElement(nums: number[], val: number): number {
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != val) {
      nums[k++] = nums[i];
    }
  }
  return k;
}

// ------------------------------------------
// 3. 删除有序数组中的重复项 (Remove Duplicates from Sorted Array) [简单]
// ------------------------------------------
// 给你一个 非严格递增排列 的数组 nums，请你 原地 删除重复出现的元素，
// 使每个元素 只出现一次，返回删除后数组的新长度。元素的 相对顺序 应该保持一致。
//
// 示例 1：
//   输入：nums = [1,1,2]
//   输出：2, nums = [1,2,_]
//
// 示例 2：
//   输入：nums = [0,0,1,1,1,2,2,3,3,4]
//   输出：5, nums = [0,1,2,3,4,_,_,_,_,_]

function removeDuplicates(nums: number[]): number {
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i == 0 || nums[i] != nums[i - 1]) {
      nums[k++] = nums[i];
    }
  }
  return k;
}

// ------------------------------------------
// 4. 删除有序数组中的重复项 II (Remove Duplicates from Sorted Array II) [中等]
// ------------------------------------------
// 给你一个有序数组 nums，请你 原地 删除重复出现的元素，使得出现次数超过两次的元素
// 只出现两次，返回删除后数组的新长度。
//
// 示例 1：
//   输入：nums = [1,1,1,2,2,3]
//   输出：5, nums = [1,1,2,2,3,_]
//
// 示例 2：
//   输入：nums = [0,0,1,1,1,1,2,3,3]
//   输出：7, nums = [0,0,1,1,2,3,3,_,_]

function removeDuplicatesII(nums: number[]): number {
  let map = new Map();
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], map.get(nums[i] || 0) + 1);
    if (k == 0 || map.get(nums[i]) <= 2) {
      nums[k++] = nums[i];
    }
  }
  return k;
}

// ------------------------------------------
// 5. 多数元素 (Majority Element) [简单]
// ------------------------------------------
// 给定一个大小为 n 的数组 nums，返回其中的多数元素。多数元素是指在数组中出现次数
// 大于 ⌊n/2⌋ 的元素。你可以假设数组是非空的，并且给定的数组总是存在多数元素。
//
// 示例 1：
//   输入：nums = [3,2,3]
//   输出：3
//
// 示例 2：
//   输入：nums = [2,2,1,1,1,2,2]
//   输出：2

function majorityElement(nums: number[]): number {
  nums = nums.sort((a, b) => a - b);
  return nums[Math.floor((nums.length - 1) / 2)];
}

// ------------------------------------------
// 6. 轮转数组 (Rotate Array) [中等]
// ------------------------------------------
// 给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。
//
// 示例 1：
//   输入：nums = [1,2,3,4,5,6,7], k = 3
//   输出：[5,6,7,1,2,3,4]
//
// 示例 2：
//   输入：nums = [-1,-100,3,99], k = 2
//   输出：[3,99,-1,-100]

function rotate(nums: number[], k: number): void {
  const n = nums.length;
  const copy = [...nums];
  k = k % n;
  let i = 0;
  for (let j = 0; j < k; j++) {
    nums[i++] = copy[n - k + 1];
  }
  for (let j = 0; j < n - k + 1; j++) {
    nums[i++] = copy[j++];
  }
}

// ------------------------------------------
// 7. 买卖股票的最佳时机 (Best Time to Buy and Sell Stock) [简单]
// ------------------------------------------
// 给定一个数组 prices，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
// 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。
// 设计一个算法来计算你所能获取的最大利润。
// 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0。
//
// 示例 1：
//   输入：prices = [7,1,5,3,6,4]
//   输出：5（在第 2 天买入，第 5 天卖出，利润 = 6-1 = 5）
//
// 示例 2：
//   输入：prices = [7,6,4,3,1]
//   输出：0（没有交易完成，最大利润为 0）

function maxProfit(prices: number[]): number {
  let min = prices[0],
    res = 0;
  for (let i = 0; i < prices.length; i++) {
    res = Math.max(res, prices[i] - min);
    min = Math.min(min, prices[i]);
  }
  return res;
}

// ------------------------------------------
// 8. 买卖股票的最佳时机 II (Best Time to Buy and Sell Stock II) [中等]
// ------------------------------------------
// 给你一个整数数组 prices，其中 prices[i] 表示某支股票第 i 天的价格。
// 在每一天，你可以决定是否购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。
// 你也可以先购买，然后在 同一天 出售。返回你能获得的 最大 利润。
//
// 示例 1：
//   输入：prices = [7,1,5,3,6,4]
//   输出：7（第2天买入第3天卖出利润4，第4天买入第5天卖出利润3，总利润7）
//
// 示例 2：
//   输入：prices = [1,2,3,4,5]
//   输出：4（第1天买入第5天卖出，利润4）
//
// 示例 3：
//   输入：prices = [7,6,4,3,1]
//   输出：0

function maxProfitII(prices: number[]): number {
  let res = 0;
  for (let i = 0; i < prices.length; i++) {
    if (i > 0 && prices[i] > prices[i - 1]) {
      res += prices[i] - prices[i - 1];
    }
  }
  return res;
}

// ------------------------------------------
// 9. 跳跃游戏 (Jump Game) [中等]
// ------------------------------------------
// 给你一个非负整数数组 nums，你最初位于数组的 第一个下标。
// 数组中的每个元素代表你在该位置可以跳跃的最大长度。
// 判断你是否能够到达最后一个下标。
//
// 示例 1：
//   输入：nums = [2,3,1,1,4]
//   输出：true（可以先跳 1 步到下标 1，然后跳 3 步到最后一个下标）
//
// 示例 2：
//   输入：nums = [3,2,1,0,4]
//   输出：false（无论怎样都会到达下标 3，但该下标最大跳跃长度是 0）

function canJump(nums: number[]): boolean {
  let farthest = nums[0];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > farthest) return false;
    farthest = Math.max(farthest, nums[i] + i);
  }
  return true;
}

// ------------------------------------------
// 10. 跳跃游戏 II (Jump Game II) [中等]
// ------------------------------------------
// 给定一个长度为 n 的 0 索引整数数组 nums。初始位置为 nums[0]。
// 每个元素 nums[i] 表示从索引 i 向前跳转的最大长度。
// 返回到达 nums[n - 1] 的最小跳跃次数。生成的测试用例可以到达 nums[n - 1]。
//
// 示例 1：
//   输入：nums = [2,3,1,1,4]
//   输出：2（跳到下标1再跳到末尾）
//
// 示例 2：
//   输入：nums = [2,3,0,1,4]
//   输出：2

function jump(nums: number[]): number {
  let jumps = 0,
    curEnd = 0,
    farthest = 0;
  for (let i = 0; i < nums.length; i++) {
    farthest = Math.max(farthest, nums[i] + i);
    if (i == curEnd) {
      jumps++;
      curEnd = farthest;
    }
  }
  return jumps;
}

// ------------------------------------------
// 11. H 指数 (H-Index) [中等]
// ------------------------------------------
// 给你一个整数数组 citations，其中 citations[i] 表示研究者的第 i 篇论文被引用的次数。
// 计算并返回该研究者的 h 指数。
// h 指数的定义：h 代表"高引用次数"，一名科研人员的 h 指数是指他（她）至少发表了
// h 篇论文，并且每篇论文 至少 被引用 h 次。如果 h 有多种可能的值，h 指数是其中最大的那个。
//
// 示例 1：
//   输入：citations = [3,0,6,1,5]
//   输出：3（有 3 篇论文每篇至少被引用 3 次）
//
// 示例 2：
//   输入：citations = [1,3,1]
//   输出：1

function hIndex(citations: number[]): number {
  citations = citations.sort((a, b) => b - a);
  let max = 0;
  for (let i = 0; i < citations.length; i++) {
    if (citations[i] >= i + 1) {
      max = i + 1;
    }
  }
  return max;
}

// ------------------------------------------
// 12. O(1) 时间插入、删除和获取随机元素 (Insert Delete GetRandom O(1)) [中等]
// ------------------------------------------
// 实现 RandomizedSet 类：
// - RandomizedSet() 初始化 RandomizedSet 对象
// - bool insert(int val) 当元素 val 不存在时，向集合中插入该项，并返回 true；否则返回 false。
// - bool remove(int val) 当元素 val 存在时，从集合中移除该项，并返回 true；否则返回 false。
// - int getRandom() 随机返回现有集合中的一项（测试用例保证调用此方法时集合中至少存在一个元素）。
//   每个元素应该有 相同的概率 被返回。
// 你必须实现类的所有函数，并满足每个函数的 平均 时间复杂度为 O(1)。
//
// 示例：
//   输入：["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]
//         [[], [1], [2], [2], [], [1], [2], []]
//   输出：[null, true, false, true, 2, true, false, 2]

class RandomizedSet {
  map: Map<number, number>;
  arr: number[];
  constructor() {
    this.map = new Map();
    this.arr = [];
  }
  insert(val: number): boolean {
    if (this.map.get(val)) return false;
    this.arr.push(val);
    this.map.set(val, this.arr.length - 1);
    return true;
  }
  remove(val: number): boolean {
    if (!this.map.get(val)) return false;
    let idx = this.map.get(val);
    [this.arr[idx], this.arr[this.arr.length - 1]] = [
      this.arr[this.arr.length - 1],
      this.arr[idx],
    ];
    this.arr.pop();
    this.map.delete(val);
    return true;
  }
  getRandom(): number {
    return this.arr[Math.floor(Math.random() * this.arr.length)];
  }
}

// ------------------------------------------
// 13. 除了自身以外数组的乘积 (Product of Array Except Self) [中等]
// ------------------------------------------
// 给你一个整数数组 nums，返回数组 answer，其中 answer[i] 等于 nums 中除 nums[i] 之外
// 其余各元素的乘积。
// 题目数据 保证 数组 nums 之中任意元素的全部前缀元素和后缀的乘积都在 32 位整数范围内。
// 请 不要使用除法，且在 O(n) 时间复杂度内完成此题。
//
// 示例 1：
//   输入：nums = [1,2,3,4]
//   输出：[24,12,8,6]
//
// 示例 2：
//   输入：nums = [-1,1,0,-3,3]
//   输出：[0,0,9,0,0]

function productExceptSelf(nums: number[]): number[] {
  let leftProduct = [],
    tl = 1;
  let rightProduct = [],
    tr = 1;
  for (let i = 0; i < nums.length; i++) {
    leftProduct.push(tl);
    tl *= nums[i];
  }
  for (let j = nums.length - 1; j >= 0; j--) {
    rightProduct.unshift(tr);
    tr *= nums[j];
  }
  let res = [];
  for (let i = 0; i < nums.length; i++) {
    res.push(leftProduct[i] * rightProduct[i]);
  }
  return res;
}

// ------------------------------------------
// 14. 加油站 (Gas Station) [中等]
// ------------------------------------------
// 在一条环路上有 n 个加油站，其中第 i 个加油站有汽油 gas[i] 升。
// 你有一辆油箱容量无限的的汽车，从第 i 个加油站开往第 i+1 个加油站需要消耗汽油 cost[i] 升。
// 你从其中的一个加油站出发，开始时油箱为空。
// 给定两个整数数组 gas 和 cost，如果你可以按顺序绕环路行驶一周，则返回出发时加油站的编号，
// 否则返回 -1。如果存在解，则 保证 它是 唯一 的。
//
// 示例 1：
//   输入：gas = [1,2,3,4,5], cost = [3,4,5,1,2]
//   输出：3
//
// 示例 2：
//   输入：gas = [2,3,4], cost = [3,4,3]
//   输出：-1

function canCompleteCircuit(gas: number[], cost: number[]): number {
  let total = 0,
    cur = 0,
    start = 0;
  for (let i = 0; i < gas.length; i++) {
    const diff = gas[i] - cost[i];
    total += diff;
    cur += diff;
    if (cur < 0) {
      start = i + 1;
      cur = 0;
    }
  }
  return total > 0 ? start : -1;
}

// ------------------------------------------
// 15. 分发糖果 (Candy) [困难]
// ------------------------------------------
// n 个孩子站成一排。给你一个整数数组 ratings 表示每个孩子的评分。
// 你需要按照以下要求，给这些孩子分发糖果：
// - 每个孩子至少分配到 1 个糖果。
// - 相邻两个孩子评分更高的孩子会获得更多的糖果。
// 请你给每个孩子分发糖果，计算并返回需要准备的 最少糖果数目。
//
// 示例 1：
//   输入：ratings = [1,0,2]
//   输出：5（分别分配 2、1、2 颗糖果）
//
// 示例 2：
//   输入：ratings = [1,2,2]
//   输出：4（分别分配 1、2、1 颗糖果，第三个孩子只需满足至少1个）

function candy(ratings: number[]): number {
  let n = ratings.length;
  let canditions = new Array(n).fill(1);
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      canditions[i] = canditions[i - 1] + 1;
    }
  }
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      canditions[i] = Math.max(canditions[i], canditions[i + 1] + 1);
    }
  }
  return canditions.reduce((a, b) => a + b, 0);
}

// ------------------------------------------
// 16. 接雨水 (Trapping Rain Water) [困难]
// ------------------------------------------
// 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
//
// 示例 1：
//   输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
//   输出：6
//
// 示例 2：
//   输入：height = [4,2,0,3,2,5]
//   输出：9

function trap(height: number[]): number {
  let n = height.length;
  let lv = new Array(n).fill(0),
    rv = new Array(n).fill(0);
  let max = 0;
  for (let i = 0; i < height.length; i++) {
    max = Math.max(height[i], max);
    lv[i] = max;
  }
  max = 0;
  for (let i = height.length - 1; i >= 0; i--) {
    max = Math.max(height[i], max);
    rv[i] = max;
  }
  let res = 0;
  for (let i = 0; i < height.length; i++) {
    let cur = Math.min(lv[i], rv[i])
    if(height[i] < cur) {
      res += (cur - height[i] )
    }
  }
  return res;
}

// ------------------------------------------
// 17. 罗马数字转整数 (Roman to Integer) [简单]
// ------------------------------------------
// 罗马数字包含以下七种字符: I(1), V(5), X(10), L(50), C(100), D(500), M(1000)
// 特殊规则：I 在 V(5) 和 X(10) 左边表示 4 和 9；
//          X 在 L(50) 和 C(100) 左边表示 40 和 90；
//          C 在 D(500) 和 M(1000) 左边表示 400 和 900。
//
// 示例 1：
//   输入：s = "III"
//   输出：3
//
// 示例 2：
//   输入：s = "LVIII"
//   输出：58
//
// 示例 3：
//   输入：s = "MCMXCIV"
//   输出：1994（M=1000, CM=900, XC=90, IV=4）

function romanToInt(s: string): number {
  return 0;
}

// ------------------------------------------
// 18. 整数转罗马数字 (Integer to Roman) [中等]
// ------------------------------------------
// 给你一个整数，将其转为罗马数字。
// 七个不同的符号代表不同值：I(1), V(5), X(10), L(50), C(100), D(500), M(1000)
//
// 示例 1：
//   输入：num = 3749
//   输出："MMMDCCXLIX"
//
// 示例 2：
//   输入：num = 58
//   输出："LVIII"
//
// 示例 3：
//   输入：num = 1994
//   输出："MCMXCIV"

function intToRoman(num: number): string {
  return "";
}

// ------------------------------------------
// 19. 最后一个单词的长度 (Length of Last Word) [简单]
// ------------------------------------------
// 给你一个字符串 s，由若干单词组成，单词前后用一些空格字符隔开。
// 返回字符串中 最后一个 单词的长度。单词是指仅由字母组成、不包含任何空格字符的最大子字符串。
//
// 示例 1：
//   输入：s = "Hello World"
//   输出：5
//
// 示例 2：
//   输入：s = "   fly me   to   the moon  "
//   输出：4
//
// 示例 3：
//   输入：s = "luffy is still joyboy"
//   输出：6

function lengthOfLastWord(s: string): number {
  return 0;
}

// ------------------------------------------
// 20. 最长公共前缀 (Longest Common Prefix) [简单]
// ------------------------------------------
// 编写一个函数来查找字符串数组中的最长公共前缀。如果不存在公共前缀，返回空字符串 ""。
//
// 示例 1：
//   输入：strs = ["flower","flow","flight"]
//   输出："fl"
//
// 示例 2：
//   输入：strs = ["dog","racecar","car"]
//   输出：""（这些单词没有公共前缀）

function longestCommonPrefix(strs: string[]): string {
  return "";
}

// ------------------------------------------
// 21. 反转字符串中的单词 (Reverse Words in a String) [中等]
// ------------------------------------------
// 给你一个字符串 s，请你反转字符串中 单词 的顺序。
// 单词是由非空格字符组成的字符串。s 中使用至少一个空格将字符串中的 单词 分隔开。
// 返回 单词 顺序颠倒且 单词 之间用单个空格连接的结果字符串。
// 注意：s 可能在前后或中间包含多余的空格，结果中单词间应仅用单个空格分隔，且不包含额外空格。
//
// 示例 1：
//   输入：s = "the sky is blue"
//   输出："blue is sky the"
//
// 示例 2：
//   输入：s = "  hello world  "
//   输出："world hello"
//
// 示例 3：
//   输入：s = "a good   example"
//   输出："example good a"

function reverseWords(s: string): string {
  return "";
}

// ------------------------------------------
// 22. Z 字形变换 (Zigzag Conversion) [中等]
// ------------------------------------------
// 将一个给定字符串 s 根据给定的行数 numRows，以从上往下、从左到右进行 Z 字形排列。
// 比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：
// P   A   H   N
// A P L S I I G
// Y   I   R
// 之后，你的输出需要从左往右逐行读取，产生出一个新的字符串："PAHNAPLSIIGYIR"
//
// 示例 1：
//   输入：s = "PAYPALISHIRING", numRows = 3
//   输出："PAHNAPLSIIGYIR"
//
// 示例 2：
//   输入：s = "PAYPALISHIRING", numRows = 4
//   输出："PINALSIGYAHRPI"
//
// 示例 3：
//   输入：s = "A", numRows = 1
//   输出："A"

function convert(s: string, numRows: number): string {
  return "";
}

// ------------------------------------------
// 23. 找出字符串中第一个匹配项的下标 (Find the Index of the First Occurrence in a String) [简单]
// ------------------------------------------
// 给你两个字符串 haystack 和 needle，请你在 haystack 字符串中找出 needle 字符串的
// 第一个匹配项的下标（下标从 0 开始）。如果 needle 不是 haystack 的一部分，则返回 -1。
//
// 示例 1：
//   输入：haystack = "sadbutsad", needle = "sad"
//   输出：0
//
// 示例 2：
//   输入：haystack = "leetcode", needle = "leeto"
//   输出：-1

function strStr(haystack: string, needle: string): number {
  return -1;
}

// ------------------------------------------
// 24. 文本左右对齐 (Text Justification) [困难]
// ------------------------------------------
// 给定一个单词数组 words 和一个长度 maxWidth，重新排版单词，使其成为每行恰好有 maxWidth 个字符，
// 且左右两端对齐的文本。
// 你应该使用 "贪心算法" 来放置给定的单词；也就是说，尽可能多地往每行中放置单词。
// 必要时填充额外的空格 ' ' 使每行恰好有 maxWidth 个字符。
// 要求尽可能均匀分配单词间的空格数量。如果某一行单词间的空格不能均匀分配，
// 则左侧放置的空格数要多于右侧的空格数。
// 文本的最后一行应为左对齐，且单词之间不插入额外的空格。
//
// 示例 1：
//   输入：words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16
//   输出：[
//     "This    is    an",
//     "example  of text",
//     "justification.  "
//   ]
//
// 示例 2：
//   输入：words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16
//   输出：[
//     "What   must   be",
//     "acknowledgment  ",
//     "shall be        "
//   ]

function fullJustify(words: string[], maxWidth: number): string[] {
  return [];
}

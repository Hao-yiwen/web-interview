// ============================================================================
// MiniMax 面试高频手写题
// ============================================================================
//
// 公开面经中明确出现的手撕题：
// 1. 无重复字符的最长子串 (LeetCode 3, 滑动窗口)
// 2. 快速排序 (手写基础排序)
// 3. K 个有序数组的中位数 (分治 / 二分)
// 4. 区间第 k 小查询，支持多次查询 (主席树 / 线段树 / 离线)
// 5. 手撕 AUC (算法岗/推荐岗)
// 6. 蛇形矩阵 (实现题)
//
// ============================================================================
// 必刷第一梯队 (12 题)
// ============================================================================
// LeetCode 3   无重复字符的最长子串
// LeetCode 1   两数之和
// LeetCode 206 反转链表
// LeetCode 21  合并两个有序链表
// LeetCode 141 环形链表
// LeetCode 53  最大子数组和
// LeetCode 94  二叉树中序遍历
// LeetCode 102 二叉树层序遍历
// LeetCode 200 岛屿数量
// LeetCode 215 数组中的第 K 个最大元素
// LeetCode 239 滑动窗口最大值
// LeetCode 15  三数之和
//
// ============================================================================
// 补强第二梯队 (8 题)
// ============================================================================
// LeetCode 300 最长递增子序列
// LeetCode 121 买卖股票的最佳时机
// LeetCode 199 二叉树右视图
// LeetCode 46  全排列
// LeetCode 56  合并区间
// LeetCode 146 LRU 缓存
// LeetCode 33  搜索旋转排序数组
// LeetCode 98  验证二叉搜索树
//
// ============================================================================
// 非 LeetCode 但很可能现场让你写
// ============================================================================
// - 快速排序
// - 快速选择
// - 蛇形矩阵
// - 手撕 AUC
// - 二分答案类模板
// - TopK / 堆模板
//
// 核心准备策略：
// 把滑动窗口、链表、二叉树遍历、堆、快排/快选、基础 DP
// 这 6 套模板练到能 10 分钟内手写出来
// ============================================================================

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val ?? 0;
    this.next = next ?? null;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val ?? 0;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

// ------------------------------------------
// 1. 无重复字符的最长子串 (LeetCode 3) [中等]
// ------------------------------------------
// 给定一个字符串 s，请你找出其中不含有重复字符的 最长子串 的长度。
//
// 示例 1：
//   输入：s = "abcabcbb"
//   输出：3（"abc"）
//
// 示例 2：
//   输入：s = "bbbbb"
//   输出：1（"b"）
//
// 示例 3：
//   输入：s = "pwwkew"
//   输出：3（"wke"）
//
// 提示：滑动窗口 + HashMap 记录字符最近出现位置

function lengthOfLongestSubstring(s: string): number {
  const map = new Map<string, number>();
  let l = 0, res = 0;
  for (let r = 0; r < s.length; r++) {
    if (map.has(s[r]) && map.get(s[r])! >= l) l = map.get(s[r])! + 1;
    map.set(s[r], r);
    res = Math.max(res, r - l + 1);
  }
  return res;
}

// ------------------------------------------
// 2. 两数之和 (LeetCode 1) [简单]
// ------------------------------------------
// 给定一个整数数组 nums 和一个整数目标值 target，
// 请你在该数组中找出和为目标值 target 的那 两个 整数，并返回它们的数组下标。
// 你可以假设每种输入只会对应一个答案，且同一个元素不能使用两次。
//
// 示例 1：
//   输入：nums = [2,7,11,15], target = 9
//   输出：[0,1]（nums[0] + nums[1] == 9）
//
// 示例 2：
//   输入：nums = [3,2,4], target = 6
//   输出：[1,2]
//
// 示例 3：
//   输入：nums = [3,3], target = 6
//   输出：[0,1]
//
// 提示：HashMap 一次遍历，存 {值: 索引}

function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i];
    if (map.has(comp)) return [map.get(comp)!, i];
    map.set(nums[i], i);
  }
  return [];
}

// ------------------------------------------
// 3. 反转链表 (LeetCode 206) [简单]
// ------------------------------------------
// 给你单链表的头节点 head，请你反转链表，并返回反转后的链表。
//
// 示例 1：
//   输入：head = [1,2,3,4,5]
//   输出：[5,4,3,2,1]
//
// 示例 2：
//   输入：head = [1,2]
//   输出：[2,1]
//
// 示例 3：
//   输入：head = []
//   输出：[]
//
// 提示：三指针迭代法 prev/curr/next，或递归

function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null, curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}

// ------------------------------------------
// 4. 合并两个有序链表 (LeetCode 21) [简单]
// ------------------------------------------
// 将两个升序链表合并为一个新的 升序 链表并返回。
// 新链表是通过拼接给定的两个链表的所有节点组成的。
//
// 示例 1：
//   输入：l1 = [1,2,4], l2 = [1,3,4]
//   输出：[1,1,2,3,4,4]
//
// 示例 2：
//   输入：l1 = [], l2 = []
//   输出：[]
//
// 示例 3：
//   输入：l1 = [], l2 = [0]
//   输出：[0]
//
// 提示：dummy 头节点 + 逐一比较拼接

function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode(); let cur = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) { cur.next = l1; l1 = l1.next; }
    else { cur.next = l2; l2 = l2.next; }
    cur = cur.next;
  }
  cur.next = l1 ?? l2;
  return dummy.next;
}

// ------------------------------------------
// 5. 环形链表 (LeetCode 141) [简单]
// ------------------------------------------
// 给你一个链表的头节点 head，判断链表中是否有环。
// 如果链表中存在环，则返回 true；否则返回 false。
//
// 示例 1：
//   输入：head = [3,2,0,-4], pos = 1（尾节点连接到索引 1 的节点）
//   输出：true
//
// 示例 2：
//   输入：head = [1,2], pos = 0
//   输出：true
//
// 示例 3：
//   输入：head = [1], pos = -1
//   输出：false
//
// 提示：快慢指针，快指针每次走 2 步，慢指针每次走 1 步，若相遇则有环

function hasCycle(head: ListNode | null): boolean {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

// ------------------------------------------
// 6. 最大子数组和 (LeetCode 53) [中等]
// ------------------------------------------
// 给你一个整数数组 nums，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），
// 返回其最大和。
//
// 示例 1：
//   输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
//   输出：6（连续子数组 [4,-1,2,1] 的和最大，为 6）
//
// 示例 2：
//   输入：nums = [1]
//   输出：1
//
// 示例 3：
//   输入：nums = [5,4,-1,7,8]
//   输出：23
//
// 提示：Kadane 算法，curSum = max(nums[i], curSum + nums[i])

function maxSubArray(nums: number[]): number {
  const dp = new Array(nums.length);
  dp[0] = nums[0];
  let max = dp[0];
  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
    max = Math.max(max, dp[i]);
  }
  return max;
}

// ------------------------------------------
// 7. 二叉树中序遍历 (LeetCode 94) [简单]
// ------------------------------------------
// 给定一个二叉树的根节点 root，返回它的 中序 遍历（左 -> 根 -> 右）。
//
// 示例 1：
//   输入：root = [1,null,2,3]
//        1
//         \
//          2
//         /
//        3
//   输出：[1,3,2]
//
// 示例 2：
//   输入：root = []
//   输出：[]
//
// 示例 3：
//   输入：root = [1]
//   输出：[1]
//
// 提示：迭代法用栈，一直往左压栈，弹出时访问并转向右子树

function inorderTraversal(root: TreeNode | null): number[] {
  const res: number[] = [], stack: TreeNode[] = [];
  let cur = root;
  while (cur || stack.length) {
    while (cur) { stack.push(cur); cur = cur.left; }
    cur = stack.pop()!;
    res.push(cur.val);
    cur = cur.right;
  }
  return res;
}

// ------------------------------------------
// 8. 二叉树层序遍历 (LeetCode 102) [中等]
// ------------------------------------------
// 给你二叉树的根节点 root，返回其节点值的 层序遍历（逐层地，从左到右访问所有节点）。
//
// 示例 1：
//   输入：root = [3,9,20,null,null,15,7]
//        3
//       / \
//      9  20
//        /  \
//       15   7
//   输出：[[3],[9,20],[15,7]]
//
// 示例 2：
//   输入：root = [1]
//   输出：[[1]]
//
// 示例 3：
//   输入：root = []
//   输出：[]
//
// 提示：BFS 用队列，每轮记录当前层 size，循环 size 次取出节点

function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const queue: TreeNode[] = [root], res: number[][] = [];
  while (queue.length) {
    const len = queue.length, level: number[] = [];
    for (let i = 0; i < len; i++) {
      const node = queue.shift()!;
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(level);
  }
  return res;
}

// ------------------------------------------
// 9. 岛屿数量 (LeetCode 200) [中等]
// ------------------------------------------
// 给你一个由 '1'（陆地）和 '0'（水）组成的二维网格，请你计算网格中岛屿的数量。
// 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或垂直方向上相邻的陆地连接形成。
// 你可以假设该网格的四条边均被水包围。
//
// 示例 1：
//   输入：grid = [
//     ["1","1","1","1","0"],
//     ["1","1","0","1","0"],
//     ["1","1","0","0","0"],
//     ["0","0","0","0","0"]
//   ]
//   输出：1
//
// 示例 2：
//   输入：grid = [
//     ["1","1","0","0","0"],
//     ["1","1","0","0","0"],
//     ["0","0","1","0","0"],
//     ["0","0","0","1","1"]
//   ]
//   输出：3
//
// 提示：遍历网格，遇到 '1' 则 count++，然后 DFS/BFS 将连通的 '1' 全部标记为 '0'

function numIslands(grid: string[][]): number {
  const m = grid.length, n = grid[0].length;
  let count = 0;
  function dfs(r: number, c: number) {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== "1") return;
    grid[r][c] = "0";
    dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
  }
  for (let r = 0; r < m; r++)
    for (let c = 0; c < n; c++)
      if (grid[r][c] === "1") { count++; dfs(r, c); }
  return count;
}

// ------------------------------------------
// 10. 数组中的第 K 个最大元素 (LeetCode 215) [中等]
// ------------------------------------------
// 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
// 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
// 你必须设计并实现时间复杂度为 O(n) 的算法解决此题。
//
// 示例 1：
//   输入：nums = [3,2,1,5,6,4], k = 2
//   输出：5
//
// 示例 2：
//   输入：nums = [3,2,3,1,2,4,5,5,6], k = 4
//   输出：4
//
// 提示：快速选择算法（QuickSelect），转化为找第 n-k 小的元素
//   平均 O(n)，最坏 O(n²)，可随机化 pivot 优化

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
// 11. 滑动窗口最大值 (LeetCode 239) [困难]
// ------------------------------------------
// 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。
// 你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。
// 返回 滑动窗口中的最大值 组成的数组。
//
// 示例 1：
//   输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
//   输出：[3,3,5,5,6,7]
//   解释：
//     窗口位置                最大值
//     [1  3  -1] -3  5  3  6  7    3
//      1 [3  -1  -3] 5  3  6  7    3
//      1  3 [-1  -3  5] 3  6  7    5
//      1  3  -1 [-3  5  3] 6  7    5
//      1  3  -1  -3 [5  3  6] 7    6
//      1  3  -1  -3  5 [3  6  7]   7
//
// 示例 2：
//   输入：nums = [1], k = 1
//   输出：[1]
//
// 提示：单调递减队列（deque 存索引），队头是当前窗口最大值的索引
//   - 新元素入队前，弹出所有比它小的队尾元素
//   - 检查队头是否超出窗口范围

function maxSlidingWindow(nums: number[], k: number): number[] {
  const res: number[] = [], deque: number[] = []; // 存索引，单调递减
  for (let i = 0; i < nums.length; i++) {
    while (deque.length && deque[0] <= i - k) deque.shift(); // 队头超出窗口
    while (deque.length && nums[deque[deque.length - 1]] <= nums[i]) deque.pop(); // 弹出比当前小的
    deque.push(i);
    if (i >= k - 1) res.push(nums[deque[0]]);
  }
  return res;
}

// ------------------------------------------
// 12. 三数之和 (LeetCode 15) [中等]
// ------------------------------------------
// 给你一个整数数组 nums，判断是否存在三元组 [nums[i], nums[j], nums[k]]
// 满足 i != j、i != k 且 j != k，同时还满足 nums[i] + nums[j] + nums[k] == 0。
// 请你返回所有和为 0 且不重复的三元组。答案中不可以包含重复的三元组。
//
// 示例 1：
//   输入：nums = [-1,0,1,2,-1,-4]
//   输出：[[-1,-1,2],[-1,0,1]]
//
// 示例 2：
//   输入：nums = [0,1,1]
//   输出：[]
//
// 示例 3：
//   输入：nums = [0,0,0]
//   输出：[[0,0,0]]
//
// 提示：先排序，固定第一个数后对剩余部分双指针。去重：跳过相邻重复元素

function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        res.push([nums[i], nums[l], nums[r]]);
        while (l < r && nums[l] === nums[l + 1]) l++;
        while (l < r && nums[r] === nums[r - 1]) r--;
        l++; r--;
      } else if (sum < 0) l++; else r--;
    }
  }
  return res;
}

// ------------------------------------------
// 13. 最长递增子序列 (LeetCode 300) [中等]
// ------------------------------------------
// 给你一个整数数组 nums，找到其中最长严格递增子序列的长度。
// 子序列是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。
//
// 示例 1：
//   输入：nums = [10,9,2,5,3,7,101,18]
//   输出：4（最长递增子序列是 [2,3,7,101]）
//
// 示例 2：
//   输入：nums = [0,1,0,3,2,3]
//   输出：4
//
// 示例 3：
//   输入：nums = [7,7,7,7,7,7,7]
//   输出：1
//
// 提示：
//   方法一：DP O(n²)，dp[i] = 以 nums[i] 结尾的 LIS 长度
//   方法二：贪心 + 二分 O(n log n)，维护 tails 数组
//     tails[i] = 长度为 i+1 的递增子序列的最小尾元素
//     对每个 num，二分查找 tails 中第一个 >= num 的位置并替换

function lengthOfLIS(nums: number[]): number {
  const dp = new Array(nums.length).fill(1);
  let max = 1;
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
    max = Math.max(max, dp[i]);
  }
  return max;
}

// ------------------------------------------
// 14. 买卖股票的最佳时机 (LeetCode 121) [简单]
// ------------------------------------------
// 给定一个数组 prices，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
// 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。
// 设计一个算法来计算你所能获取的最大利润。如果你不能获取任何利润，返回 0。
//
// 示例 1：
//   输入：prices = [7,1,5,3,6,4]
//   输出：5（第 2 天买入（价格 = 1），第 5 天卖出（价格 = 6），利润 = 6-1 = 5）
//
// 示例 2：
//   输入：prices = [7,6,4,3,1]
//   输出：0（没有交易完成，最大利润为 0）
//
// 提示：一次遍历，维护到目前为止的最低价格 minPrice，
//   每天计算 price - minPrice 更新 maxProfit

function maxProfit(prices: number[]): number {
  let min = prices[0], res = 0;
  for (let i = 0; i < prices.length; i++) {
    res = Math.max(res, prices[i] - min);
    min = Math.min(min, prices[i]);
  }
  return res;
}

// ------------------------------------------
// 15. 二叉树的右视图 (LeetCode 199) [中等]
// ------------------------------------------
// 给定一个二叉树的 根节点 root，想象自己站在它的右侧，
// 按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
//
// 示例 1：
//   输入：root = [1,2,3,null,5,null,4]
//        1
//       / \
//      2   3
//       \   \
//        5   4
//   输出：[1,3,4]
//
// 示例 2：
//   输入：root = [1,null,3]
//   输出：[1,3]
//
// 示例 3：
//   输入：root = []
//   输出：[]
//
// 提示：BFS 层序遍历，每层取最后一个节点值

function rightSideView(root: TreeNode | null): number[] {
  if (!root) return [];
  const queue: TreeNode[] = [root], res: number[] = [];
  while (queue.length) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const node = queue.shift()!;
      if (i === len - 1) res.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return res;
}

// ------------------------------------------
// 16. 全排列 (LeetCode 46) [中等]
// ------------------------------------------
// 给定一个不含重复数字的数组 nums，返回其 所有可能的全排列。你可以 按任意顺序 返回答案。
//
// 示例 1：
//   输入：nums = [1,2,3]
//   输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
//
// 示例 2：
//   输入：nums = [0,1]
//   输出：[[0,1],[1,0]]
//
// 示例 3：
//   输入：nums = [1]
//   输出：[[1]]
//
// 提示：回溯法，维护 used[] 标记已使用的元素，
//   path 长度等于 nums 长度时收集结果

function permute(nums: number[]): number[][] {
  const res: number[][] = [];
  function bt(cur: number[], used: boolean[]) {
    if (cur.length === nums.length) { res.push([...cur]); return; }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true; cur.push(nums[i]);
      bt(cur, used);
      used[i] = false; cur.pop();
    }
  }
  bt([], new Array(nums.length).fill(false));
  return res;
}

// ------------------------------------------
// 17. 合并区间 (LeetCode 56) [中等]
// ------------------------------------------
// 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi]。
// 请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。
//
// 示例 1：
//   输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
//   输出：[[1,6],[8,10],[15,18]]（区间 [1,3] 和 [2,6] 重叠，合并为 [1,6]）
//
// 示例 2：
//   输入：intervals = [[1,4],[4,5]]
//   输出：[[1,5]]（区间 [1,4] 和 [4,5] 可被视为重叠区间）
//
// 提示：按起始端点排序，遍历时与 result 最后一个区间比较，
//   若重叠则更新右端点，否则直接加入

function merge(intervals: number[][]): number[][] {
  intervals.sort((a, b) => a[0] - b[0]);
  const res: number[][] = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];
    const last = res[res.length - 1];
    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      res.push([start, end]);
    }
  }
  return res;
}

// ------------------------------------------
// 18. LRU 缓存 (LeetCode 146) [中等]
// ------------------------------------------
// 请你设计并实现一个满足 LRU（最近最少使用）缓存约束的数据结构。
// 实现 LRUCache 类：
//   - LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
//   - int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1
//   - void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value；
//     如果不存在，则向缓存中插入该组 key-value。如果插入操作导致关键字数量超过 capacity，
//     则应该 逐出 最久未使用的关键字。
// 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。
//
// 示例：
//   输入：
//     ["LRUCache","put","put","get","put","get","put","get","get","get"]
//     [[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]
//   输出：[null,null,null,1,null,-1,null,-1,3,4]
//   解释：
//     LRUCache lru = new LRUCache(2);
//     lru.put(1, 1);  // 缓存是 {1=1}
//     lru.put(2, 2);  // 缓存是 {1=1, 2=2}
//     lru.get(1);     // 返回 1
//     lru.put(3, 3);  // 逐出 key 2，缓存是 {1=1, 3=3}
//     lru.get(2);     // 返回 -1（未找到）
//     lru.put(4, 4);  // 逐出 key 1，缓存是 {4=4, 3=3}
//     lru.get(1);     // 返回 -1（未找到）
//     lru.get(3);     // 返回 3
//     lru.get(4);     // 返回 4
//
// 提示：JS/TS 可以利用 Map 的插入顺序特性（delete + set = 移到最新）
//   或手写双向链表 + HashMap

class LRUCache {
  private map = new Map<number, number>();

  constructor(private capacity: number) {}

  get(key: number): number {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key)!;
    this.map.delete(key);
    this.map.set(key, val); // 移到末尾 = 最近使用
    return val;
  }

  put(key: number, value: number): void {
    this.map.delete(key); // 存在则先删，统一走 set
    if (this.map.size >= this.capacity) {
      this.map.delete(this.map.keys().next().value!); // 删最久未用（第一个 key）
    }
    this.map.set(key, value);
  }
}

// ------------------------------------------
// 19. 搜索旋转排序数组 (LeetCode 33) [中等]
// ------------------------------------------
// 整数数组 nums 按升序排列，数组中的值 互不相同。
// 在传递给函数之前，nums 在预先未知的某个下标 k 上进行了旋转，
// 使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]。
// 例如 [0,1,2,4,5,6,7] 在下标 3 处旋转后变为 [4,5,6,7,0,1,2]。
// 给你旋转后的数组 nums 和一个整数 target，如果 nums 中存在这个目标值，
// 则返回它的下标，否则返回 -1。你必须设计一个时间复杂度为 O(log n) 的算法。
//
// 示例 1：
//   输入：nums = [4,5,6,7,0,1,2], target = 0
//   输出：4
//
// 示例 2：
//   输入：nums = [4,5,6,7,0,1,2], target = 3
//   输出：-1
//
// 示例 3：
//   输入：nums = [1], target = 0
//   输出：-1
//
// 提示：二分查找，每次判断 mid 在哪一半有序段内
//   - 若 nums[lo] <= nums[mid]，左半有序
//   - 否则右半有序
//   再判断 target 是否在有序段范围内来缩小区间

function searchRotated(nums: number[], target: number): number {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const mid = (l + r) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[l] <= nums[mid]) {
      if (nums[l] <= target && target < nums[mid]) r = mid - 1; else l = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[r]) l = mid + 1; else r = mid - 1;
    }
  }
  return -1;
}

// ------------------------------------------
// 20. 验证二叉搜索树 (LeetCode 98) [中等]
// ------------------------------------------
// 给你一个二叉树的根节点 root，判断其是否是一个有效的二叉搜索树。
// 有效 BST 定义如下：
//   - 节点的左子树只包含 小于 当前节点的数
//   - 节点的右子树只包含 大于 当前节点的数
//   - 所有左子树和右子树自身必须也是二叉搜索树
//
// 示例 1：
//   输入：root = [2,1,3]
//        2
//       / \
//      1   3
//   输出：true
//
// 示例 2：
//   输入：root = [5,1,4,null,null,3,6]
//        5
//       / \
//      1   4
//        / \
//       3   6
//   输出：false（根节点的值是 5，右子节点的值是 4，不满足 BST）
//
// 提示：递归传递 (min, max) 范围，
//   validate(node, min, max): node.val 必须在 (min, max) 开区间内

function isValidBST(root: TreeNode | null): boolean {
  function validate(node: TreeNode | null, min: number, max: number): boolean {
    if (!node) return true;
    if (node.val <= min || node.val >= max) return false;
    return validate(node.left, min, node.val) && validate(node.right, node.val, max);
  }
  return validate(root, -Infinity, Infinity);
}

// ============================================================================
// 以下为非 LeetCode 题目 / 模板题
// ============================================================================

// ------------------------------------------
// 21. 快速排序 [模板]
// ------------------------------------------
// 实现经典快速排序算法，对数组原地排序。
//
// 示例：
//   输入：arr = [3,6,8,10,1,2,1]
//   输出：[1,1,2,3,6,8,10]
//
// 算法步骤：
//   1. 选择 pivot（这里取最后一个元素）
//   2. partition：将 < pivot 的元素放左边，>= pivot 的放右边，返回 pivot 最终位置
//   3. 对 pivot 左右两部分递归排序
//
// 复杂度：平均 O(n log n)，最坏 O(n²)（有序数组 + 固定选最后元素）

function quickSort(arr: number[], lo: number, hi: number): void {
  if (lo >= hi) return;
  const p = partition(arr, lo, hi);
  quickSort(arr, lo, p - 1);
  quickSort(arr, p + 1, hi);
}

function partition(arr: number[], lo: number, hi: number): number {
  const pivot = arr[hi]; let i = lo;
  for (let j = lo; j < hi; j++) if (arr[j] < pivot) [arr[i], arr[j]] = [arr[j], arr[i++]];
  [arr[i], arr[hi]] = [arr[hi], arr[i]];
  return i;
}

// ------------------------------------------
// 22. 快速选择 [模板]
// ------------------------------------------
// 在未排序数组中找到第 k 小的元素（0-indexed）。
// 基于快速排序的 partition 思想，每次只递归一侧。
//
// 示例：
//   输入：arr = [3,2,1,5,6,4], k = 2
//   输出：3（排序后 [1,2,3,4,5,6]，第 2 个即索引 2 = 3）
//
// 复杂度：平均 O(n)，最坏 O(n²)

function quickSelect(arr: number[], lo: number, hi: number, k: number): number {
  const p = partition(arr, lo, hi);
  if (p === k) return arr[p];
  return p < k ? quickSelect(arr, p + 1, hi, k) : quickSelect(arr, lo, p - 1, k);
}

// ------------------------------------------
// 23. 蛇形矩阵 / 螺旋矩阵生成 (LeetCode 59) [中等]
// ------------------------------------------
// 给你一个正整数 n，生成一个包含 1 到 n² 所有元素，
// 且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵。
//
// 示例 1：
//   输入：n = 3
//   输出：[[1,2,3],
//          [8,9,4],
//          [7,6,5]]
//
// 示例 2：
//   输入：n = 1
//   输出：[[1]]
//
// 提示：维护四个边界 top/bottom/left/right，按 右->下->左->上 的顺序填充
//   每填完一个方向收缩对应边界

function generateSpiralMatrix(n: number): number[][] {
  const matrix = Array.from({ length: n }, () => new Array(n).fill(0));
  let top = 0, bottom = n - 1, left = 0, right = n - 1, num = 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) matrix[top][c] = num++;
    top++;
    for (let r = top; r <= bottom; r++) matrix[r][right] = num++;
    right--;
    for (let c = right; c >= left; c--) matrix[bottom][c] = num++;
    bottom--;
    for (let r = bottom; r >= top; r--) matrix[r][left] = num++;
    left++;
  }
  return matrix;
}

// ------------------------------------------
// 24. TopK - 最小堆模板 [模板]
// ------------------------------------------
// 给定一个整数数组 nums 和整数 k，返回数组中最大的 k 个元素。
//
// 示例：
//   输入：nums = [3,1,5,12,2,11], k = 3
//   输出：[5,11,12]（顺序不要求）
//
// 思路：维护一个大小为 k 的最小堆
//   - 遍历数组，每个元素入堆
//   - 堆大小超过 k 时弹出堆顶（最小值）
//   - 最终堆中剩余的就是最大的 k 个元素
//
// 复杂度：O(n log k)

class MinHeap {
  private heap: number[] = [];

  push(val: number): void {
    this.heap.push(val);
    let i = this.heap.length - 1;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.heap[parent] <= this.heap[i]) break;
      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
    }
  }

  pop(): number {
    const top = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length) {
      this.heap[0] = last;
      let i = 0;
      while (true) {
        let smallest = i;
        const l = 2 * i + 1, r = 2 * i + 2;
        if (l < this.heap.length && this.heap[l] < this.heap[smallest]) smallest = l;
        if (r < this.heap.length && this.heap[r] < this.heap[smallest]) smallest = r;
        if (smallest === i) break;
        [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
        i = smallest;
      }
    }
    return top;
  }

  peek(): number {
    return this.heap[0];
  }

  size(): number {
    return this.heap.length;
  }
}

function topKLargest(nums: number[], k: number): number[] {
  const heap = new MinHeap();
  for (const num of nums) {
    heap.push(num);
    if (heap.size() > k) heap.pop();
  }
  const res: number[] = [];
  while (heap.size()) res.push(heap.pop());
  return res;
}

// ------------------------------------------
// 25. 二分答案模板 [模板]
// ------------------------------------------
// 适用场景：答案具有单调性，可以通过二分缩小范围。
// 常见题型：最小化最大值、最大化最小值。
//
// 示例（分割数组的最大值 LeetCode 410）：
//   将数组分成 m 段，使得各段和的最大值最小。
//   输入：nums = [7,2,5,10,8], m = 2
//   输出：18（[7,2,5] 和 [10,8]，各段和分别为 14 和 18，最大值 18 最小）
//
// 模板：
//   1. 确定答案的搜索范围 [lo, hi]
//   2. 实现 check(mid): 判断 mid 作为答案是否可行
//   3. 二分收缩：可行则缩小上界，不可行则提高下界
//
// 复杂度：O(n log(hi - lo))

function binarySearchAnswer(lo: number, hi: number): number {
  function check(mid: number): boolean {
    // 根据具体题目实现
    return true;
  }
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (check(mid)) hi = mid; // mid 可行，尝试更小的答案
    else lo = mid + 1;        // mid 不可行，提高下界
  }
  return lo;
}

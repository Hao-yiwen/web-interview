// ============================================
// 数组 / 字符串
// ============================================

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
  let min = prices[0], res = 0;
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
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) res += prices[i] - prices[i - 1];
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
  let farthest = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > farthest) return false;
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
  let jumps = 0, curEnd = 0, farthest = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, nums[i] + i);
    if (i === curEnd) { jumps++; curEnd = farthest; }
  }
  return jumps;
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
  const n = nums.length;
  const res = new Array(n).fill(1);
  let left = 1;
  for (let i = 0; i < n; i++) { res[i] = left; left *= nums[i]; }
  let right = 1;
  for (let i = n - 1; i >= 0; i--) { res[i] *= right; right *= nums[i]; }
  return res;
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
  const n = height.length;
  const lv = new Array(n).fill(0), rv = new Array(n).fill(0);
  let max = 0;
  for (let i = 0; i < n; i++) { max = Math.max(max, height[i]); lv[i] = max; }
  max = 0;
  for (let i = n - 1; i >= 0; i--) { max = Math.max(max, height[i]); rv[i] = max; }
  let res = 0;
  for (let i = 0; i < n; i++) res += Math.min(lv[i], rv[i]) - height[i];
  return res;
}

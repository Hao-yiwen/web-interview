// ============================================
// 一维动态规划
// ============================================

// ------------------------------------------
// 1. 爬楼梯 (Climbing Stairs) [简单]
// ------------------------------------------
// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
//
// 示例 1：
//   输入：n = 2
//   输出：2（1+1 或 2）
//
// 示例 2：
//   输入：n = 3
//   输出：3（1+1+1、1+2、2+1）

function climbStairs(n: number): number {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) [a, b] = [b, a + b];
  return b;
}

// ------------------------------------------
// 2. 打家劫舍 (House Robber) [中等]
// ------------------------------------------
// 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，
// 影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，
// 如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
// 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下，一夜之内能够偷窃到的最高金额。
//
// 示例 1：
//   输入：nums = [1,2,3,1]
//   输出：4（偷窃第 1 间（金额 = 1）和第 3 间（金额 = 3），总金额 = 1 + 3 = 4）
//
// 示例 2：
//   输入：nums = [2,7,9,3,1]
//   输出：12（偷窃第 1、3、5 间，总金额 = 2 + 9 + 1 = 12）

function rob(nums: number[]): number {
  let d2 = 0, d1 = 0;
  for (const n of nums) [d1, d2] = [Math.max(d1, d2 + n), d1];
  return d1;
}

// ------------------------------------------
// 3. 单词拆分 (Word Break) [中等]
// ------------------------------------------
// 给你一个字符串 s 和一个字符串列表 wordDict 作为字典。
// 如果可以利用字典中出现的一个或多个单词拼接出 s 则返回 true。
// 注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。
//
// 示例 1：
//   输入：s = "leetcode", wordDict = ["leet","code"]
//   输出：true（"leetcode" 可以由 "leet" + "code" 拼接）
//
// 示例 2：
//   输入：s = "applepenapple", wordDict = ["apple","pen"]
//   输出：true（"apple" + "pen" + "apple"）
//
// 示例 3：
//   输入：s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
//   输出：false

function wordBreak(s: string, wordDict: string[]): boolean {
  const set = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++)
    for (let j = 0; j < i; j++)
      if (dp[j] && set.has(s.slice(j, i))) { dp[i] = true; break; }
  return dp[s.length];
}

// ------------------------------------------
// 4. 零钱兑换 (Coin Change) [中等]
// ------------------------------------------
// 给你一个整数数组 coins，表示不同面额的硬币；以及一个整数 amount，表示总金额。
// 计算并返回可以凑成总金额所需的 最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。
// 你可以认为每种硬币的数量是无限的。
//
// 示例 1：
//   输入：coins = [1,2,5], amount = 11
//   输出：3（11 = 5 + 5 + 1）
//
// 示例 2：
//   输入：coins = [2], amount = 3
//   输出：-1
//
// 示例 3：
//   输入：coins = [1], amount = 0
//   输出：0

function coinChange(coins: number[], amount: number): number {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++)
    for (const coin of coins)
      if (coin <= i) dp[i] = Math.min(dp[i], dp[i - coin] + 1);
  return dp[amount] === Infinity ? -1 : dp[amount];
}

// ------------------------------------------
// 5. 最长递增子序列 (Longest Increasing Subsequence) [中等]
// ------------------------------------------
// 给你一个整数数组 nums，找到其中最长严格递增子序列的长度。
// 子序列是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。
// 例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。
//
// 示例 1：
//   输入：nums = [10,9,2,5,3,7,101,18]
//   输出：4（最长递增子序列是 [2,3,7,101]，长度为 4）
//
// 示例 2：
//   输入：nums = [0,1,0,3,2,3]
//   输出：4
//
// 示例 3：
//   输入：nums = [7,7,7,7,7,7,7]
//   输出：1

function lengthOfLIS(nums: number[]): number {
  const dp = new Array(nums.length).fill(1);
  let max = 1;
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
    max = Math.max(max, dp[i]);
  }
  return max;
}

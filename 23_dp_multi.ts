// ============================================
// 多维动态规划
// ============================================

// ------------------------------------------
// 1. 最小路径和 (Minimum Path Sum) [中等]
// ------------------------------------------
// 给定一个包含非负整数的 m x n 网格 grid，请找出一条从左上角到右下角的路径，
// 使得路径上的数字总和为最小。
// 说明：每次只能向下或者向右移动一步。
//
// 示例 1：
//   输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
//   输出：7（路径 1→3→1→1→1，总和最小为 7）
//
// 示例 2：
//   输入：grid = [[1,2,3],[4,5,6]]
//   输出：12

function minPathSum(grid: number[][]): number {
  const m = grid.length, n = grid[0].length;
  const dp = grid.map(r => [...r]);
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) continue;
      else if (i === 0) dp[i][j] += dp[i][j-1];
      else if (j === 0) dp[i][j] += dp[i-1][j];
      else dp[i][j] += Math.min(dp[i-1][j], dp[i][j-1]);
    }
  return dp[m-1][n-1];
}

// ------------------------------------------
// 2. 最长回文子串 (Longest Palindromic Substring) [中等]
// ------------------------------------------
// 给你一个字符串 s，找到 s 中最长的回文子串。
//
// 示例 1：
//   输入：s = "babad"
//   输出："bab"（"aba" 同样是符合题意的答案）
//
// 示例 2：
//   输入：s = "cbbd"
//   输出："bb"

function longestPalindrome(s: string): string {
  let res = "";
  for (let i = 0; i < s.length; i++) {
    for (const [l, r] of [[i, i], [i, i + 1]] as [number,number][]) {
      let lo = l, hi = r;
      while (lo >= 0 && hi < s.length && s[lo] === s[hi]) { lo--; hi++; }
      if (hi - lo - 1 > res.length) res = s.slice(lo + 1, hi);
    }
  }
  return res;
}

// ------------------------------------------
// 3. 编辑距离 (Edit Distance) [中等]
// ------------------------------------------
// 给你两个单词 word1 和 word2，请返回将 word1 转换成 word2 所使用的最少操作数。
// 你可以对一个单词进行如下三种操作：
// - 插入一个字符
// - 删除一个字符
// - 替换一个字符
//
// 示例 1：
//   输入：word1 = "horse", word2 = "ros"
//   输出：3（horse → rorse (替换 h→r) → rose (删除 r) → ros (删除 e)）
//
// 示例 2：
//   输入：word1 = "intention", word2 = "execution"
//   输出：5（intention → inention → enention → exention → exection → execution）

function minDistance(word1: string, word2: string): number {
  const m = word1.length, n = word2.length;
  const dp = Array.from({length: m+1}, (_, i) =>
    Array.from({length: n+1}, (_, j) => i === 0 ? j : j === 0 ? i : 0));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = word1[i-1] === word2[j-1]
        ? dp[i-1][j-1]
        : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}

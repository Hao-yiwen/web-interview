// ============================================
// 回溯
// ============================================

// ------------------------------------------
// 1. 电话号码的字母组合 (Letter Combinations of a Phone Number) [中等]
// ------------------------------------------
// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
// 2-abc, 3-def, 4-ghi, 5-jkl, 6-mno, 7-pqrs, 8-tuv, 9-wxyz
//
// 示例 1：
//   输入：digits = "23"
//   输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
//
// 示例 2：
//   输入：digits = ""
//   输出：[]
//
// 示例 3：
//   输入：digits = "2"
//   输出：["a","b","c"]

function letterCombinations(digits: string): string[] {
  if (!digits) return [];
  const map: Record<string, string> = {"2":"abc","3":"def","4":"ghi","5":"jkl","6":"mno","7":"pqrs","8":"tuv","9":"wxyz"};
  const res: string[] = [];
  function bt(idx: number, cur: string) {
    if (idx === digits.length) { res.push(cur); return; }
    for (const c of map[digits[idx]]) bt(idx + 1, cur + c);
  }
  bt(0, "");
  return res;
}

// ------------------------------------------
// 2. 全排列 (Permutations) [中等]
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
// 3. 组合总和 (Combination Sum) [中等]
// ------------------------------------------
// 给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target，
// 找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合，并以列表形式返回。
// 你可以按 任意顺序 返回这些组合。
// candidates 中的 同一个 数字可以 无限制重复被选取。如果至少一个数字的被选数量不同，则两种组合是不同的。
//
// 示例 1：
//   输入：candidates = [2,3,6,7], target = 7
//   输出：[[2,2,3],[7]]
//
// 示例 2：
//   输入：candidates = [2,3,5], target = 8
//   输出：[[2,2,2,2],[2,3,3],[3,5]]
//
// 示例 3：
//   输入：candidates = [2], target = 1
//   输出：[]

function combinationSum(candidates: number[], target: number): number[][] {
  const res: number[][] = [];
  candidates.sort((a, b) => a - b);
  function bt(start: number, cur: number[], remain: number) {
    if (remain === 0) { res.push([...cur]); return; }
    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] > remain) break;
      cur.push(candidates[i]); bt(i, cur, remain - candidates[i]); cur.pop();
    }
  }
  bt(0, [], target);
  return res;
}

// ------------------------------------------
// 4. 括号生成 (Generate Parentheses) [中等]
// ------------------------------------------
// 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
//
// 示例 1：
//   输入：n = 3
//   输出：["((()))","(()())","(())()","()(())","()()()"]
//
// 示例 2：
//   输入：n = 1
//   输出：["()"]

function generateParenthesis(n: number): string[] {
  const res: string[] = [];
  function bt(cur: string, open: number, close: number) {
    if (cur.length === 2 * n) { res.push(cur); return; }
    if (open < n) bt(cur + "(", open + 1, close);
    if (close < open) bt(cur + ")", open, close + 1);
  }
  bt("", 0, 0);
  return res;
}

// ------------------------------------------
// 5. 单词搜索 (Word Search) [中等]
// ------------------------------------------
// 给定一个 m x n 二维字符网格 board 和一个字符串单词 word。
// 如果 word 存在于网格中，返回 true；否则，返回 false。
// 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中"相邻"单元格是那些水平相邻或垂直相邻的单元格。
// 同一个单元格内的字母不允许被重复使用。
//
// 示例 1：
//   输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
//   输出：true
//
// 示例 2：
//   输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
//   输出：true
//
// 示例 3：
//   输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
//   输出：false

function exist(board: string[][], word: string): boolean {
  const m = board.length, n = board[0].length;
  function dfs(r: number, c: number, idx: number): boolean {
    if (idx === word.length) return true;
    if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== word[idx]) return false;
    const tmp = board[r][c]; board[r][c] = "#";
    const found = dfs(r+1,c,idx+1)||dfs(r-1,c,idx+1)||dfs(r,c+1,idx+1)||dfs(r,c-1,idx+1);
    board[r][c] = tmp;
    return found;
  }
  for (let r = 0; r < m; r++)
    for (let c = 0; c < n; c++)
      if (dfs(r, c, 0)) return true;
  return false;
}

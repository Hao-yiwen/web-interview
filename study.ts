function lengthofLts(nums: number[]): number {
  const dp = new Array(nums.length).fill(1);
  let max = 1;
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++)
      if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
    max = Math.max(max, dp[i]);
  }
  return max;
}

function coinChange(conins: number[], amount: number): number {
  let dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 0; i < dp.length; i++) {
    for (const coin of conins) {
      if (coin <= i) dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }
  return dp[amount] == Infinity ? -1 : dp[amount];
}

function wordBreak(s: string, wordDict: string[]) {
  let set = new Set(wordDict);
  let dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 0; i < dp.length; i++) {
    for (let j = 0; j < i; j++)
      if (dp[j] && set.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
  }
  return dp[s.length];
}

function permute(nums: number[]): number[][] {
  let res = [];
  function bt(cur: number[], used: boolean[]) {
    if (cur.length === nums.length) {
      res.push(...cur);
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      cur.push(nums[i]);
      bt(cur, used);
      used[i] = false;
      cur.pop();
    }
  }
  bt([], new Array(nums.length).fill(false));
  return res;
}

function numIsLands(grid: string[][]): number {
  const m = grid.length,
    n = grid[0].length;
  let count = 0;
  function dfs(r: number, c: number) {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== "1") return;
    grid[r][c] = "0";
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] == "1") {
        count++;
        dfs(i, j);
      }
    }
  }
  return count;
}

function generateParenthesis(n: number): string[] {
  const res: string[] = [];
  function bt(cur: string, open: number, close: number) {
    if (cur.length == 2 * n) {
      res.push(cur);
      return;
    }
    if (open < n) bt(cur + "(", open + 1, close);
    if (close < open) bt(cur + ")", open, close + 1);
  }
  bt("", 0, 0);
  return res;
}

function exist(board: string[][], word: string): boolean {
  const m = board.length,
    n = board[0].length;
  function dfs(r: number, c: number, idx: number): boolean {
    if (idx == word.length) return true;
    if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] != word[idx])
      return false;
    const tmp = board[r][c];
    board[r][c] = "#";
    const found =
      dfs(r + 1, c, idx + 1) ||
      dfs(r - 1, c, idx + 1) ||
      dfs(r, c + 1, idx + 1) ||
      dfs(r, c - 1, idx + 1);
    board[r][c] = tmp;
    return found;
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }
  return false;
}

function reverseBetween(
  head: ListNode | null,
  left: number,
  right: number,
): ListNode | null {
  const dummy = new ListNode(0, head);
  let pre = dummy;
  for (let i = 1; i < left; i++) pre = pre.next;
  let cur = pre.next
  for(let i=0;i<right-left;i++){
    const next = cur.next
    cur.next = next.next
  }
}

function palouti(n: number): number {
  if (n <= 2) return n;
  let dp = new Array(n).fill(0);
  dp[0] = 1;
  dp[1] = 2;
  for (let i = 2; i < n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n - 1];
}

function rob(nums: number[]): number {
  let dp = new Array(nums.length).fill(0);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[1], nums[0]);
  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1]);
  }
  return dp[nums.length - 1];
}

function wordBreak(s: string, wordDict: string[]) {
  let set = new Set(wordDict);
  let dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i < s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && set.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length - 1];
}

function coinChange(coins: number[], amount: number) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i < amount; i++) {
    for (const coin of coins) {
      dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

function lengthOfLIS(nums: number[]): number {
  let dp = new Array(nums.length).fill(1);
  let max = 1;
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    max = Math.max(max, dp[i]);
  }
  return max;
}

function dianhuazuhe(digits: string): string {
  let map = {
    "2": "abc",
    "3": "def",
    "4": "ghi",
    "5": "jkl",
    "6": "mno",
    "7": "pqrs",
    "8": "tuv",
    "9": "wxyz",
  };
  let res = [];
  function bt(idx: number, cur: string) {
    if (idx == digits.length) {
      res.push(cur);
      return;
    }
    for (const c of map[digits[idx]]) {
      bt(idx + 1, cur + c);
    }
  }
  bt(0, "");
  return res;
}

function quanpailie(nums: number[]): number[][] {
  const res = [];
  function bt(cur: number[], used: boolean[]) {
    if (cur.length == nums.length) {
      res.push([...cur]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      cur.push(nums[i]);
      bt(cur, used);
      cur.pop();
      used[i] = false;
    }
  }
  bt([], new Array(nums.length).fill(false));
  return res;
}

function generateKuoHao(n: number): string[] {
  let res = [];
  function bt(cur: string, open: number, close: number) {
    if (cur.length == n * 2) {
      res.push(cur);
      return;
    }
    if (open < n) bt(cur + "(", open + 1, close);
    if (close < open) bt(cur + ")", open, close + 1);
  }
  bt("", 0, 0);
  return res;
}

function linkreverse(head: ListNode): ListNode | null {
  if (!head) return head;
  let pre = null,
    cur = head;
  while (cur) {
    const next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  return pre;
}

function throttle(func, wait) {
  let previos = 0;
  let timer = null;
  return function (...args) {
    let now = Date.now();
    let reaming = wait - (now - previos);
    if (reaming <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      previos = now;
      func.apply(this, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        previos = Date.now();
        func.apply(this, args);
      }, reaming);
    }
  };
}

function composeNumber(digits: string) {
  const map = {
    "2": "abc",
    "3": "def",
    "4": "ghi",
    "5": "jkl",
    "6": "mno",
    "7": "pqrs",
    "8": "tuv",
    "9": "wxyz",
  };
  let res = [];
  function bt(cur: string, idx: number) {
    if (cur.length == digits.length) {
      res.push(cur);
      return;
    }
    for (const c of map[digits[idx]]) {
      bt(cur + c, idx + 1);
    }
  }
  bt("", 0);
  return res;
}

function quanpailie(nums: number[]) {
  let res = [];
  function bt(cur: number[], used: boolean[]) {
    if (cur.length == nums.length) {
      res.push(cur);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      cur.push(nums[i]);
      bt(cur, used);
      cur.pop();
      used[i] = false;
    }
  }
  bt([], new Array(nums.length).fill(false));
  return res;
}

function kuohaoshengcheng(n: number): string[] {
  const res = [];
  function bt(cur: string, open: number, close: number) {
    if (cur.length == 2 * n) {
      res.push(cur);
      return;
    }
    if (open < n) {
      bt(cur + "(", open + 1, close);
    }
    if (close < open) {
      bt(cur + ")", open, close);
    }
  }
  bt("", 0, 0);
  return res;
}

function combinationSum(candidates: number[], target: number) {
  const res = []
  candidates.sort((a,b)=> a-b)
  function bt(start: number, cur: number[], remain: number) {
    if(remain == 0) res.push(cur)
    for(let i=0;i<candidates.length;i++){
      if(candidates[i] > remain) break
      cur.push(candidates[i]);
      bt(i, cur, remain - candidates[i])
      cur.pop()
    }
  }
  bt(0, [], target)
  return res
}

function throttle(func, wait){
  let previos = 0
  let timer = null
  return function(...args){
    let now = Date.now()
    let remain = wait - (now - previos)
    if(remain <= 0){
      if(timer){
        clearTimeout(timer)
        timer = null
      }
      previos = now
      func.apply(this, args)
    } else if(!timer) {
      timer = setTimeout(() => {
        previos = Date.now()
        func.apply(this, args)
      }, remain)
    }
  }
}

function create(proto) {
  function F(){}
  F.prototype = proto
  return F
}

class Schedular {
  runningCount: number
  size: number
  queue: any[]
  constructor(size){
    this.runningCount = 0
    this.size = size
    this.queue = []
  }

  run(promise){
    const execuate = () => {
      new Promise((resolve, reject) => {
        this.runningCount++
        promise
          .then(resolve)
          .catch(reject)
          .finally(() => {
            this.runningCount--
            const next = this.queue.pop()
            next()
          })
      })
    }
    if(this.queue.length < this.size){
      execuate()
    } else {
      this.queue.push(execuate)
    }
  }
}
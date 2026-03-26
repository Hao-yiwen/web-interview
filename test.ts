<<<<<<< HEAD
import { rejects } from "assert";
import { time } from "console";
import { resolve } from "path";

function debounce(func, wait, immedit) {
  let timer = null;
  function debounced(...args) {
    const context = this;
    let callNow = !timer;
    let res = null;
    if (timer) {
      clearTimeout(timer);
    }
    if (immedit) {
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timer = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  }
  debounced.cancel = () => {
    clearTimeout(timer);
    timer = null;
  };
  return debounced;
}

function curry(func) {
  let len = func.length;
  return function curried(...args) {
    if (len == args.length) {
      func.apply(this, args);
    } else {
      return function (...inArgs) {
        return curried.apply(args.concat(inArgs));
      };
    }
  };
}

function flatten(arr, depth = 1) {
  if (!Array.isArray(arr)) {
    return arr;
  }
  if (depth <= 0) return arr;
  return arr.reduce((acc, cur) => {
    if (Array.isArray(cur)) {
      return acc.concat(flatten(cur, depth - 1));
    } else {
      return acc.concat(cur);
    }
  }, []);
}

class EventEmit {
  events: any;
  constructor() {
    this.events = {};
  }

  on(type, handler) {
    if (!this.events[type]) {
      this.events[type] = [handler];
    } else {
      this.events[type].push(handler);
    }
  }

  off(type, handler) {
    if (!this.events[type]) {
      this.events[type] = [];
    } else {
      this.events[type] = this.events[type].filter(
        (cb) => cb != handler && cb.original != handler,
      );
    }
  }

  emit(type, ...args) {
    if (!this.events[type]) {
      return false;
    }
    this.events[type].forEach((cb) => cb());
    return true;
  }

  once(type, handler) {
    const wrapper = (...agrs) => {
      this.off(type, wrapper);
      handler.apply(this, agrs);
    };
    wrapper.original = handler;
    return this.on(type, wrapper);
  }
}

function deepClone(obj, map = new Map()) {
  if (typeof obj != "object" && obj == null) {
    return obj;
  }

  if (map.has(obj)) {
    return map.get(obj);
  }
  let constructor = obj.constructor;
  if (/^(RegExp|Date|Error)$/i.test(constructor.name)) {
    return new constructor(obj);
  }
  let cloneTarget = Array.isArray(obj)
    ? []
    : Object.create(Object.getPrototypeOf(obj));
  map.set(obj, cloneTarget);
  if (obj instanceof Map) {
    obj.forEach((key, val) => {
      cloneTarget.set(key, val);
    });
    return cloneTarget;
  }
  if (obj instanceof Set) {
    obj.forEach((s) => {
      cloneTarget.set(s);
    });
    return cloneTarget;
  }
  Reflect.ownKeys(obj).forEach((key) => {
    cloneTarget[key] = obj[key];
  });
  return cloneTarget;
}

function myNew(constructor, ...agrs) {
  if (typeof constructor != "function") {
    throw new Error("constructor must be function");
  }
  const obj = Object.create(constructor.prototype);
  const res = constructor.apply(obj, agrs);
  const isFunction = typeof res == "function";
  const isObj = typeof res == "object" && res != null;
  return isFunction || isObj ? res : obj;
}

Promise.myAll((iterator) => {
  return new Promise((resolve, reject) => {
    if (!iterator && typeof iterator[Symbol.iterator] != "function") {
      reject(new Error("args must be iterator"));
    }
    let promises = Array.from(iterator);
    if (promises.length == 0) resolve([]);
    let res = new Array(promises.length);
    let count = 0;
    promises.forEach((promise, i) => {
      Promise.resolve(promise)
        .then((v) => {
          res[i] = v;
          if (++count == promises.length) {
            resolve(res);
          }
        })
        .catch(reject);
    });
  });
});

Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new Error("caller must be function");
  }
  const fn = this;

  const bindFunc = function (...inArgs) {
    if (this instanceof bindFunc) {
      fn.apply(this, ...args);
    } else {
      fn.apply(context, ...args);
    }
  };
  if (fn.prototype) bindFunc.prototype = Object.create(fn.prototype);
  return bindFunc;
};

function createObj(proto) {
  function F() {}
  F.prototype = proto;
  return new F();
}

class LRUCache {
  capacity: number;
  cache: Map<string, string>;
  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) {
      return null;
    }
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }

  set(key, val) {
    if (this.cache.has(key)) {
      this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, val);
      return;
    }
    if (this.cache.size >= this.capacity) {
      let next = this.cache.keys().next().value;
      this.cache.delete(next);
    }
    this.cache.set(key, val);
  }
}

class Schedular {
  runningCount: number;
  queue: any[];
  size: number;
  constructor(size) {
    this.size = size;
    this.queue = [];
    this.runningCount = 0;
  }

  run(promise) {
    return new Promise((resolve, reject) => {
      const execuate = () => {
        this.runningCount++;
        promise()
          .then((v) => {
            this.runningCount--;
            if (this.queue.length > 0) {
              let next = this.queue.shift();
              next();
            }
          })
          .catch(reject);
      };
      if (this.queue.length < this.size) {
        execuate();
      } else {
        this.queue.push(execuate);
      }
    });
  }
=======
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
>>>>>>> 9ddccd9cc43f36ff6e6a65fdecd7bb0f299ce7c9
}

function throttle(func, wait) {
  let previos = 0;
  let timer = null;
  return function (...args) {
<<<<<<< HEAD
    const now = Date.now();
    let remain = wait - (now - previos);
    if (remain <= 0) {
        if(timer) {
            clearTimeout(timer)
            timer = null
        }
        previos = now
        func.apply(this, args)
    } else if (!timer) {
        timer = setTimeout(() => {
            func.apply(this, args)
        }, remain)
=======
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
>>>>>>> 9ddccd9cc43f36ff6e6a65fdecd7bb0f299ce7c9
    }
  };
}

<<<<<<< HEAD
function Parent(name, colors) {
    this.name =""
    this.colors = []
}

function Child(name, age) {
    Parent.call(this, name)
    this.age = age
}

Child.prototype = Object.create(Parent.prototype)

Child.prototype.constructor = Child
=======
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
>>>>>>> 9ddccd9cc43f36ff6e6a65fdecd7bb0f299ce7c9

// ============================================
// 滑动窗口
// ============================================

// ------------------------------------------
// 1. 长度最小的子数组 (Minimum Size Subarray Sum) [中等]
// ------------------------------------------
// 给定一个含有 n 个正整数的数组和一个正整数 target。
// 找出该数组中满足其总和大于等于 target 的长度最小的 连续子数组
// [numsl, numsl+1, ..., numsr-1, numsr]，并返回其长度。如果不存在符合条件的子数组，返回 0。
//
// 示例 1：
//   输入：target = 7, nums = [2,3,1,2,4,3]
//   输出：2（子数组 [4,3] 是该条件下的长度最小的子数组）
//
// 示例 2：
//   输入：target = 4, nums = [1,4,4]
//   输出：1
//
// 示例 3：
//   输入：target = 11, nums = [1,1,1,1,1,1,1,1]
//   输出：0

function minSubArrayLen(target: number, nums: number[]): number {
  let l = 0, sum = 0, res = Infinity;
  for (let r = 0; r < nums.length; r++) {
    sum += nums[r];
    while (sum >= target) { res = Math.min(res, r - l + 1); sum -= nums[l++]; }
  }
  return res === Infinity ? 0 : res;
}

// ------------------------------------------
// 2. 无重复字符的最长子串 (Longest Substring Without Repeating Characters) [中等]
// ------------------------------------------
// 给定一个字符串 s，请你找出其中不含有重复字符的 最长子串 的长度。
//
// 示例 1：
//   输入：s = "abcabcbb"
//   输出：3（无重复字符的最长子串是 "abc"，长度为 3）
//
// 示例 2：
//   输入：s = "bbbbb"
//   输出：1（无重复字符的最长子串是 "b"，长度为 1）
//
// 示例 3：
//   输入：s = "pwwkew"
//   输出：3（无重复字符的最长子串是 "wke"，长度为 3）

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
// 4. 最小覆盖子串 (Minimum Window Substring) [困难]
// ------------------------------------------
// 给你一个字符串 s、一个字符串 t。返回 s 中涵盖 t 所有字符的最小子串。
// 如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 ""。
// 注意：
// - 对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。
// - 如果 s 中存在这样的子串，我们保证它是唯一的答案。
//
// 示例 1：
//   输入：s = "ADOBECODEBANC", t = "ABC"
//   输出："BANC"（最小覆盖子串 "BANC" 包含了 t 中的 'A'、'B' 和 'C'）
//
// 示例 2：
//   输入：s = "a", t = "a"
//   输出："a"（整个字符串 s 就是最小覆盖子串）
//
// 示例 3：
//   输入：s = "a", t = "aa"
//   输出：""（t 中两个 'a' 需要被包含，但 s 中只有一个 'a'）

function minWindow(s: string, t: string): string {
  const need = new Map<string, number>();
  for (const c of t) need.set(c, (need.get(c) ?? 0) + 1);
  let have = 0, required = need.size;
  const window = new Map<string, number>();
  let l = 0, res = "", minLen = Infinity;
  for (let r = 0; r < s.length; r++) {
    const c = s[r];
    window.set(c, (window.get(c) ?? 0) + 1);
    if (need.has(c) && window.get(c) === need.get(c)) have++;
    while (have === required) {
      if (r - l + 1 < minLen) { minLen = r - l + 1; res = s.substring(l, r + 1); }
      const lc = s[l];
      window.set(lc, window.get(lc)! - 1);
      if (need.has(lc) && window.get(lc)! < need.get(lc)!) have--;
      l++;
    }
  }
  return res;
}

// ============================================
// 哈希表
// ============================================

// ------------------------------------------
// 1. 字母异位词分组 (Group Anagrams) [中等]
// ------------------------------------------
// 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。
// 字母异位词是由重新排列源单词的所有字母得到的一个新单词。
//
// 示例 1：
//   输入：strs = ["eat","tea","tan","ate","nat","bat"]
//   输出：[["bat"],["nat","tan"],["ate","eat","tea"]]
//
// 示例 2：
//   输入：strs = [""]
//   输出：[[""]]
//
// 示例 3：
//   输入：strs = ["a"]
//   输出：[["a"]]

function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>();
  for (const s of strs) {
    const key = s.split("").sort().join("");
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(s);
  }
  return Array.from(map.values());
}

// ------------------------------------------
// 2. 两数之和 (Two Sum) [简单]
// ------------------------------------------
// 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target
// 的那 两个 整数，并返回它们的数组下标。
// 你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。
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
// 3. 最长连续序列 (Longest Consecutive Sequence) [中等]
// ------------------------------------------
// 给定一个未排序的整数数组 nums，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
// 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
//
// 示例 1：
//   输入：nums = [100,4,200,1,3,2]
//   输出：4（最长数字连续序列是 [1, 2, 3, 4]，长度为 4）
//
// 示例 2：
//   输入：nums = [0,3,7,2,5,8,4,6,0,1]
//   输出：9

function longestConsecutive(nums: number[]): number {
  const set = new Set(nums);
  let res = 0;
  for (const n of set) {
    if (!set.has(n - 1)) {
      let cur = n, len = 1;
      while (set.has(cur + 1)) { cur++; len++; }
      res = Math.max(res, len);
    }
  }
  return res;
}

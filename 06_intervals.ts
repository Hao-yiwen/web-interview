// ============================================
// 区间
// ============================================

// ------------------------------------------
// 1. 合并区间 (Merge Intervals) [中等]
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

function mergeIntervals(intervals: number[][]): number[][] {
  intervals.sort((a, b) => a[0] - b[0]);
  const res: number[][] = [];
  for (const interval of intervals) {
    if (!res.length || res[res.length - 1][1] < interval[0]) res.push(interval);
    else res[res.length - 1][1] = Math.max(res[res.length - 1][1], interval[1]);
  }
  return res;
}

// ------------------------------------------
// 2. 插入区间 (Insert Interval) [中等]
// ------------------------------------------
// 给你一个 无重叠的、按照区间起始端点排序的区间列表 intervals，
// 其中 intervals[i] = [starti, endi]。
// 在列表中插入一个新的区间 newInterval = [start, end]，
// 你需要确保列表中的区间仍然有序且不重叠（如果有必要的话，可以合并区间）。
//
// 示例 1：
//   输入：intervals = [[1,3],[6,9]], newInterval = [2,5]
//   输出：[[1,5],[6,9]]
//
// 示例 2：
//   输入：intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
//   输出：[[1,2],[3,10],[12,16]]（新区间 [4,8] 与 [3,5],[6,7],[8,10] 重叠）

function insert(intervals: number[][], newInterval: number[]): number[][] {
  let i = 0; const res = [];
  while (i < intervals.length && intervals[i][1] < newInterval[0]) res.push(intervals[i++]);
  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  res.push(newInterval);
  while (i < intervals.length) res.push(intervals[i++]);
  return res;
}

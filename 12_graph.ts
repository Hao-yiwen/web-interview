// ============================================
// 图
// ============================================

// ------------------------------------------
// 1. 岛屿数量 (Number of Islands) [中等]
// ------------------------------------------
// 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
// 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或垂直方向上相邻的陆地连接形成。
// 此外，你可以假设该网格的四条边均被水包围。
//
// 示例 1：
//   输入：grid = [
//     ["1","1","1","1","0"],
//     ["1","1","0","1","0"],
//     ["1","1","0","0","0"],
//     ["0","0","0","0","0"]
//   ]
//   输出：1
//
// 示例 2：
//   输入：grid = [
//     ["1","1","0","0","0"],
//     ["1","1","0","0","0"],
//     ["0","0","1","0","0"],
//     ["0","0","0","1","1"]
//   ]
//   输出：3

function numIslands(grid: string[][]): number {
  const m = grid.length, n = grid[0].length;
  let count = 0;
  function dfs(r: number, c: number) {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== "1") return;
    grid[r][c] = "0";
    dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
  }
  for (let r = 0; r < m; r++)
    for (let c = 0; c < n; c++)
      if (grid[r][c] === "1") { count++; dfs(r, c); }
  return count;
}

// ------------------------------------------
// 2. 课程表 (Course Schedule) [中等]
// ------------------------------------------
// 你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1。
// 在选修某些课程之前需要一些先修课程。先修课程按数组 prerequisites 给出，
// 其中 prerequisites[i] = [ai, bi]，表示如果要学习课程 ai 则 必须 先学习课程 bi。
// 请你判断是否可能完成所有课程的学习？如果可以，返回 true；否则，返回 false。
//
// 示例 1：
//   输入：numCourses = 2, prerequisites = [[1,0]]
//   输出：true（先学课程 0 再学课程 1）
//
// 示例 2：
//   输入：numCourses = 2, prerequisites = [[1,0],[0,1]]
//   输出：false（存在循环依赖）

function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const indegree = new Array(numCourses).fill(0);
  const adj: number[][] = Array.from({length: numCourses}, () => []);
  for (const [a, b] of prerequisites) { adj[b].push(a); indegree[a]++; }
  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) if (indegree[i] === 0) queue.push(i);
  let completed = 0;
  while (queue.length) {
    const node = queue.shift()!; completed++;
    for (const next of adj[node]) if (--indegree[next] === 0) queue.push(next);
  }
  return completed === numCourses;
}

// ------------------------------------------
// 3. 课程表 II (Course Schedule II) [中等]
// ------------------------------------------
// 现在你总共有 numCourses 门课需要选，记为 0 到 numCourses - 1。
// 给你一个数组 prerequisites，其中 prerequisites[i] = [ai, bi]，表示在选修课程 ai 前 必须 先选修 bi。
// 返回你为了学完所有课程所安排的学习顺序。可能会有多个正确的顺序，你只要返回 任意一种 就可以了。
// 如果不可能完成所有课程，返回 一个空数组。
//
// 示例 1：
//   输入：numCourses = 2, prerequisites = [[1,0]]
//   输出：[0,1]
//
// 示例 2：
//   输入：numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
//   输出：[0,2,1,3]（或 [0,1,2,3]）
//
// 示例 3：
//   输入：numCourses = 1, prerequisites = []
//   输出：[0]

function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const indegree = new Array(numCourses).fill(0);
  const adj: number[][] = Array.from({length: numCourses}, () => []);
  for (const [a, b] of prerequisites) { adj[b].push(a); indegree[a]++; }
  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) if (indegree[i] === 0) queue.push(i);
  const order: number[] = [];
  while (queue.length) {
    const node = queue.shift()!; order.push(node);
    for (const next of adj[node]) if (--indegree[next] === 0) queue.push(next);
  }
  return order.length === numCourses ? order : [];
}

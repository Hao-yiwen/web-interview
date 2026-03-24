// ============================================
// 矩阵
// ============================================

// ------------------------------------------
// 1. 螺旋矩阵 (Spiral Matrix) [中等]
// ------------------------------------------
// 给你一个 m 行 n 列的矩阵 matrix，请按照 顺时针螺旋顺序，返回矩阵中的所有元素。
//
// 示例 1：
//   输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
//   输出：[1,2,3,6,9,8,7,4,5]
//
// 示例 2：
//   输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
//   输出：[1,2,3,4,8,12,11,10,9,5,6,7]

function spiralOrder(matrix: number[][]): number[] {
  const m = matrix.length, n = matrix[0].length;
  const res: number[] = [];
  const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // 右 下 左 上
  const visited = Array.from({ length: m }, () => new Array(n).fill(false));
  let r = 0, c = 0, d = 0;
  for (let i = 0; i < m * n; i++) {
    res.push(matrix[r][c]);
    visited[r][c] = true;
    const nr = r + dirs[d][0], nc = c + dirs[d][1];
    if (nr < 0 || nr >= m || nc < 0 || nc >= n || visited[nr][nc]) d = (d + 1) % 4;
    r += dirs[d][0];
    c += dirs[d][1];
  }
  return res;
}

// ------------------------------------------
// 2. 旋转图像 (Rotate Image) [中等]
// ------------------------------------------
// 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。
// 你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。
//
// 示例 1：
//   输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
//   输出：[[7,4,1],[8,5,2],[9,6,3]]
//
// 示例 2：
//   输入：matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
//   输出：[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

function rotateMatrix(matrix: number[][]): void {
  const n = matrix.length;
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++)
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
  for (let i = 0; i < n; i++)
    for (let j = 0; j < Math.floor(n / 2); j++)
      [matrix[i][j], matrix[i][n - 1 - j]] = [matrix[i][n - 1 - j], matrix[i][j]];
}

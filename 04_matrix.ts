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
  const res: number[] = [];
  let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) res.push(matrix[top][c]); top++;
    for (let r = top; r <= bottom; r++) res.push(matrix[r][right]); right--;
    if (top <= bottom) { for (let c = right; c >= left; c--) res.push(matrix[bottom][c]); bottom--; }
    if (left <= right) { for (let r = bottom; r >= top; r--) res.push(matrix[r][left]); left++; }
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

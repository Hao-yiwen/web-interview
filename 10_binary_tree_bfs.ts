// ============================================
// 二叉树层次遍历
// ============================================

// 注意：TreeNode 定义见 09_binary_tree.ts

// ------------------------------------------
// 1. 二叉树的右视图 (Binary Tree Right Side View) [中等]
// ------------------------------------------
// 给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
//
// 示例 1：
//   输入：root = [1,2,3,null,5,null,4]
//   输出：[1,3,4]
//
// 示例 2：
//   输入：root = [1,2,3,4,null,null,null,5]
//   输出：[1,3,4,5]
//
// 示例 3：
//   输入：root = [1,null,3]
//   输出：[1,3]

function rightSideView(root: TreeNode | null): number[] {
  if (!root) return [];
  const queue: TreeNode[] = [root], res: number[] = [];
  while (queue.length) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const node = queue.shift()!;
      if (i === len - 1) res.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return res;
}

// ------------------------------------------
// 2. 二叉树的层序遍历 (Binary Tree Level Order Traversal) [中等]
// ------------------------------------------
// 给你二叉树的根节点 root，返回其节点值的 层序遍历。（即逐层地，从左到右访问所有节点）。
//
// 示例 1：
//   输入：root = [3,9,20,null,null,15,7]
//   输出：[[3],[9,20],[15,7]]
//
// 示例 2：
//   输入：root = [1]
//   输出：[[1]]
//
// 示例 3：
//   输入：root = []
//   输出：[]

function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const queue: TreeNode[] = [root], res: number[][] = [];
  while (queue.length) {
    const len = queue.length, level: number[] = [];
    for (let i = 0; i < len; i++) {
      const node = queue.shift()!;
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(level);
  }
  return res;
}

// ============================================
// 二叉搜索树
// ============================================

// 注意：TreeNode 定义见 09_binary_tree.ts

// ------------------------------------------
// 1. 二叉搜索树的最小绝对差 (Minimum Absolute Difference in BST) [简单]
function getMinimumDifference(root: TreeNode | null): number {
  let prev: number | null = null;
  let minDiff = Infinity;
  function inorder(node: TreeNode | null) {
    if (!node) return;
    inorder(node.left);
    if (prev !== null) minDiff = Math.min(minDiff, Math.abs(node.val - prev));
    prev = node.val;
    inorder(node.right);
  }
  inorder(root);
  return minDiff;
}

// ------------------------------------------
// 2. 二叉搜索树中第 K 小的元素 (Kth Smallest Element in a BST) [中等]
function kthSmallest(root: TreeNode | null, k: number): number {
  let cnt = 0, res = 0;
  function inorder(node: TreeNode | null) {
    if (!node) return;
    inorder(node.left);
    cnt++;
    if (cnt === k) {
      res = node.val;
      return;
    }
    if (cnt < k) inorder(node.right);
  }
  inorder(root);
  return res;
}

// ------------------------------------------
// 3. 验证二叉搜索树 (Validate Binary Search Tree) [中等]
function isValidBST(root: TreeNode | null): boolean {
  function helper(node: TreeNode | null, min: number, max: number): boolean {
    if (!node) return true;
    if (node.val <= min || node.val >= max) return false;
    return helper(node.left, min, node.val) && helper(node.right, node.val, max);
  }
  return helper(root, -Infinity, Infinity);
}

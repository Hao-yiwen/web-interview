// ============================================
// 二叉树
// ============================================

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// ------------------------------------------
// 1. 翻转二叉树 (Invert Binary Tree) [简单]
// ------------------------------------------
// 给你一棵二叉树的根节点 root，翻转这棵二叉树，并返回其根节点。
//
// 示例 1：
//   输入：root = [4,2,7,1,3,6,9]
//   输出：[4,7,2,9,6,3,1]
//
// 示例 2：
//   输入：root = [2,1,3]
//   输出：[2,3,1]

function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
}

// ------------------------------------------
// 2. 对称二叉树 (Symmetric Tree) [简单]
// ------------------------------------------
// 给你一个二叉树的根节点 root，检查它是否轴对称。
//
// 示例 1：
//   输入：root = [1,2,2,3,4,4,3]
//   输出：true
//
// 示例 2：
//   输入：root = [1,2,2,null,3,null,3]
//   输出：false

function isSymmetric(root: TreeNode | null): boolean {
  function isMirror(l: TreeNode | null, r: TreeNode | null): boolean {
    if (!l && !r) return true;
    if (!l || !r) return false;
    return l.val === r.val && isMirror(l.left, r.right) && isMirror(l.right, r.left);
  }
  return isMirror(root?.left ?? null, root?.right ?? null);
}

// ------------------------------------------
// 3. 从前序与中序遍历序列构造二叉树 (Construct Binary Tree from Preorder and Inorder Traversal) [中等]
// ------------------------------------------
// 给定两个整数数组 preorder 和 inorder，其中 preorder 是二叉树的先序遍历，
// inorder 是同一棵树的中序遍历，请构造二叉树并返回其根节点。
//
// 示例 1：
//   输入：preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
//   输出：[3,9,20,null,null,15,7]
//
// 示例 2：
//   输入：preorder = [-1], inorder = [-1]
//   输出：[-1]

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  if (!preorder.length) return null;
  const root = new TreeNode(preorder[0]);
  const mid = inorder.indexOf(preorder[0]);
  root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
  root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));
  return root;
}

// ------------------------------------------
// 4. 二叉树中的最大路径和 (Binary Tree Maximum Path Sum) [困难]
// ------------------------------------------
// 二叉树中的 路径 被定义为一条节点序列，序列中每对相邻节点之间都存在一条边。
// 同一个节点在一条路径序列中 至多出现一次。该路径 至少包含一个 节点，且不一定经过根节点。
// 路径和 是路径中各节点值的总和。给你一个二叉树的根节点 root，返回其 最大路径和。
//
// 示例 1：
//   输入：root = [1,2,3]
//   输出：6（最优路径是 2 -> 1 -> 3，路径和为 2 + 1 + 3 = 6）
//
// 示例 2：
//   输入：root = [-10,9,20,null,null,15,7]
//   输出：42（最优路径是 15 -> 20 -> 7，路径和为 15 + 20 + 7 = 42）

function maxPathSum(root: TreeNode | null): number {
  let max = -Infinity;
  function dfs(node: TreeNode | null): number {
    if (!node) return 0;
    const left = Math.max(0, dfs(node.left));
    const right = Math.max(0, dfs(node.right));
    max = Math.max(max, node.val + left + right);
    return node.val + Math.max(left, right);
  }
  dfs(root);
  return max;
}

// ------------------------------------------
// 5. 二叉树的最近公共祖先 (Lowest Common Ancestor of a Binary Tree) [中等]
// ------------------------------------------
// 给定一个二叉树，找到该树中两个指定节点的最近公共祖先。
// 最近公共祖先的定义为："对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，
// 满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。"
//
// 示例 1：
//   输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
//   输出：3（节点 5 和节点 1 的最近公共祖先是节点 3）
//
// 示例 2：
//   输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
//   输出：5（节点 5 和节点 4 的最近公共祖先是节点 5）

function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode,
  q: TreeNode,
): TreeNode | null {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left ?? right;
}

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
// 1. 二叉树的最大深度 (Maximum Depth of Binary Tree) [简单]
// ------------------------------------------
// 给定一个二叉树 root，返回其 最大深度。
// 二叉树的 最大深度 是指从根节点到最远叶子节点的最长路径上的节点数。
//
// 示例 1：
//   输入：root = [3,9,20,null,null,15,7]
//   输出：3
//
// 示例 2：
//   输入：root = [1,null,2]
//   输出：2

function maxDepth(root: TreeNode | null): number {
  return 0;
}

// ------------------------------------------
// 2. 相同的树 (Same Tree) [简单]
// ------------------------------------------
// 给你两棵二叉树的根节点 p 和 q，编写一个函数来检验这两棵树是否相同。
// 如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。
//
// 示例 1：
//   输入：p = [1,2,3], q = [1,2,3]
//   输出：true
//
// 示例 2：
//   输入：p = [1,2], q = [1,null,2]
//   输出：false

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  return false;
}

// ------------------------------------------
// 3. 翻转二叉树 (Invert Binary Tree) [简单]
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
  return null;
}

// ------------------------------------------
// 4. 对称二叉树 (Symmetric Tree) [简单]
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
  return false;
}

// ------------------------------------------
// 5. 从前序与中序遍历序列构造二叉树 (Construct Binary Tree from Preorder and Inorder Traversal) [中等]
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
  return null;
}

// ------------------------------------------
// 6. 从中序与后序遍历序列构造二叉树 (Construct Binary Tree from Inorder and Postorder Traversal) [中等]
// ------------------------------------------
// 给定两个整数数组 inorder 和 postorder，其中 inorder 是二叉树的中序遍历，
// postorder 是同一棵树的后序遍历，请你构造并返回这颗二叉树。
//
// 示例 1：
//   输入：inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
//   输出：[3,9,20,null,null,15,7]
//
// 示例 2：
//   输入：inorder = [-1], postorder = [-1]
//   输出：[-1]

function buildTreeII(inorder: number[], postorder: number[]): TreeNode | null {
  return null;
}

// ------------------------------------------
// 7. 填充每个节点的下一个右侧节点指针 II (Populating Next Right Pointers in Each Node II) [中等]
// ------------------------------------------
// 给定一个二叉树：
// struct Node { int val; Node *left; Node *right; Node *next; }
// 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。
// 初始状态下，所有 next 指针都被设置为 NULL。
//
// 示例 1：
//   输入：root = [1,2,3,4,5,null,7]
//   输出：[1,#,2,3,#,4,5,7,#]
//   解释：给定二叉树如图 A 所示，函数应该填充每个 next 指针指向其下一个右侧节点。
//         序列化的输出按层序遍历排列，'#' 表示该层的末尾。

// function connect(root: Node | null): Node | null { return null; }

// ------------------------------------------
// 8. 二叉树展开为链表 (Flatten Binary Tree to Linked List) [中等]
// ------------------------------------------
// 给你二叉树的根结点 root，请你将它展开为一个单链表：
// - 展开后的单链表应该同样使用 TreeNode，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null。
// - 展开后的单链表应该与二叉树 先序遍历 顺序相同。
//
// 示例 1：
//   输入：root = [1,2,5,3,4,null,6]
//   输出：[1,null,2,null,3,null,4,null,5,null,6]
//
// 示例 2：
//   输入：root = []
//   输出：[]

function flatten(root: TreeNode | null): void {

}

// ------------------------------------------
// 9. 路径总和 (Path Sum) [简单]
// ------------------------------------------
// 给你二叉树的根节点 root 和一个表示目标和的整数 targetSum。判断该树中是否存在
// 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum。
// 叶子节点 是指没有子节点的节点。
//
// 示例 1：
//   输入：root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
//   输出：true（路径 5→4→11→2，和为 22）
//
// 示例 2：
//   输入：root = [1,2,3], targetSum = 5
//   输出：false

function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  return false;
}

// ------------------------------------------
// 10. 求根节点到叶节点数字之和 (Sum Root to Leaf Numbers) [中等]
// ------------------------------------------
// 给你一个二叉树的根节点 root，树中每个节点都存放有一个 0 到 9 之间的数字。
// 每条从根节点到叶节点的路径都代表一个数字。例如，从根节点到叶节点的路径 1 -> 2 -> 3 表示数字 123。
// 计算从根节点到叶节点生成的 所有数字之和。
//
// 示例 1：
//   输入：root = [1,2,3]
//   输出：25（根到叶路径 1->2 代表数字 12，1->3 代表 13，和为 25）
//
// 示例 2：
//   输入：root = [4,9,0,5,1]
//   输出：1026（路径 4->9->5=495, 4->9->1=491, 4->0=40，和为 1026）

function sumNumbers(root: TreeNode | null): number {
  return 0;
}

// ------------------------------------------
// 11. 二叉树中的最大路径和 (Binary Tree Maximum Path Sum) [困难]
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
  return 0;
}

// ------------------------------------------
// 12. 二叉搜索树迭代器 (Binary Search Tree Iterator) [中等]
// ------------------------------------------
// 实现一个二叉搜索树迭代器类 BSTIterator，表示一个按照中序遍历二叉搜索树（BST）的迭代器：
// - BSTIterator(TreeNode root) 初始化 BSTIterator 类的一个对象。BST 的根节点 root 会作为构造函数的一部分给出。
//   指针应初始化为一个不存在于 BST 中的数字，且该数字小于 BST 中的任何元素。
// - boolean hasNext() 如果向指针右侧遍历存在数字，则返回 true；否则返回 false。
// - int next() 将指针向右移动，然后返回指针处的数字。
// 注意，指针初始化为一个不存在于 BST 中的数字，所以对 next() 的首次调用将返回 BST 中的最小元素。
// 你可以假设 next() 调用总是有效的。
//
// 示例：
//   输入：["BSTIterator", "next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"]
//         [[[7, 3, 15, null, null, 9, 20]], [], [], [], [], [], [], [], [], []]
//   输出：[null, 3, 7, true, 9, true, 15, true, 20, false]

class BSTIterator {
  constructor(root: TreeNode | null) {}
  next(): number { return 0; }
  hasNext(): boolean { return false; }
}

// ------------------------------------------
// 13. 完全二叉树的节点个数 (Count Complete Tree Nodes) [简单]
// ------------------------------------------
// 给你一棵 完全二叉树 的根节点 root，求出该树的节点个数。
// 完全二叉树：除了最底层节点可能没填满外，其余每层节点数都达到最大值，
// 并且最下面一层的节点都集中在该层最左边的若干位置。
//
// 示例 1：
//   输入：root = [1,2,3,4,5,6]
//   输出：6
//
// 示例 2：
//   输入：root = []
//   输出：0

function countNodes(root: TreeNode | null): number {
  return 0;
}

// ------------------------------------------
// 14. 二叉树的最近公共祖先 (Lowest Common Ancestor of a Binary Tree) [中等]
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

function lowestCommonAncestor(root: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null {
  return null;
}

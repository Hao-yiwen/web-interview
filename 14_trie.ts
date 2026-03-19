// ============================================
// 字典树
// ============================================

// ------------------------------------------
// 1. 实现 Trie (前缀树) (Implement Trie / Prefix Tree) [中等]
// ------------------------------------------
// Trie（发音类似 "try"）或者说 前缀树 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。
// 这一数据结构有相当多的应用情景，例如自动补完和拼写检查。
// 请你实现 Trie 类：
// - Trie() 初始化前缀树对象。
// - void insert(String word) 向前缀树中插入字符串 word。
// - boolean search(String word) 如果字符串 word 在前缀树中，返回 true；否则，返回 false。
// - boolean startsWith(String prefix) 如果之前已经插入的字符串 word 的前缀之一为 prefix，
//   返回 true；否则，返回 false。
//
// 示例：
//   输入：["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
//         [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
//   输出：[null, null, true, false, true, null, true]

class Trie {
  private children: Map<string, Trie>;
  private isEnd: boolean;

  constructor() { this.children = new Map(); this.isEnd = false; }

  insert(word: string): void {
    let node: Trie = this;
    for (const c of word) {
      if (!node.children.has(c)) node.children.set(c, new Trie());
      node = node.children.get(c)!;
    }
    node.isEnd = true;
  }

  search(word: string): boolean {
    let node: Trie = this;
    for (const c of word) {
      if (!node.children.has(c)) return false;
      node = node.children.get(c)!;
    }
    return node.isEnd;
  }

  startsWith(prefix: string): boolean {
    let node: Trie = this;
    for (const c of prefix) {
      if (!node.children.has(c)) return false;
      node = node.children.get(c)!;
    }
    return true;
  }
}

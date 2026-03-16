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
  constructor() {}
  insert(word: string): void {}
  search(word: string): boolean { return false; }
  startsWith(prefix: string): boolean { return false; }
}

// ------------------------------------------
// 2. 添加与搜索单词 - 数据结构设计 (Design Add and Search Words Data Structure) [中等]
// ------------------------------------------
// 请你设计一个数据结构，支持 添加新单词 和 查找字符串是否与任何先前添加的字符串匹配。
// 实现词典类 WordDictionary：
// - WordDictionary() 初始化词典对象
// - void addWord(word) 将 word 添加到数据结构中，之后可以对它进行匹配
// - bool search(word) 如果数据结构中存在字符串与 word 匹配，则返回 true；否则，返回 false。
//   word 中可能包含一些 '.'，每个 '.' 都可以表示任何一个字母。
//
// 示例：
//   输入：["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
//         [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
//   输出：[null,null,null,null,false,true,true,true]

class WordDictionary {
  constructor() {}
  addWord(word: string): void {}
  search(word: string): boolean { return false; }
}

// ------------------------------------------
// 3. 单词搜索 II (Word Search II) [困难]
// ------------------------------------------
// 给定一个 m x n 二维字符网格 board 和一个单词（字符串）列表 words，
// 返回所有二维网格上的单词。
// 单词必须按照字母顺序，通过 相邻的单元格 内的字母构成，其中"相邻"单元格是那些水平相邻或垂直相邻的单元格。
// 同一个单元格内的字母在一个单词中不允许被重复使用。
//
// 示例 1：
//   输入：board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]],
//         words = ["oath","pea","eat","rain"]
//   输出：["eat","oath"]
//
// 示例 2：
//   输入：board = [["a","b"],["c","d"]], words = ["abcb"]
//   输出：[]

function findWords(board: string[][], words: string[]): string[] {
  return [];
}

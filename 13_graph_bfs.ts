// ============================================
// 图的广度优先搜索
// ============================================

// ------------------------------------------
// 1. 蛇梯棋 (Snakes and Ladders) [中等]
// ------------------------------------------
// 给你一个大小为 n x n 的整数矩阵 board，方格按从 1 到 n² 编号。
// 编号采用 转行交替方式，从左下角开始（即第 n 行、第 1 列），每一行交替方向。
// 玩家从棋盘上的方格 1 出发。每一回合，玩家需要从当前方格 curr 开始出发，按下述要求前进：
// - 选定目标方格 next，编号范围 [curr + 1, min(curr + 6, n²)]。
// - 如果 next 处存在蛇或梯子，那么玩家会传送到蛇或梯子的目的地。否则，玩家传送到 next。
// 当玩家到达编号 n² 的方格时，游戏结束。
// 返回达到编号为 n² 的方格所需的最少移动次数，如果不可能，则返回 -1。
//
// 示例 1：
//   输入：board = [[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]
//   输出：4
//
// 示例 2：
//   输入：board = [[-1,-1],[-1,3]]
//   输出：1

function snakesAndLadders(board: number[][]): number {
  return -1;
}

// ------------------------------------------
// 2. 最小基因变化 (Minimum Genetic Mutation) [中等]
// ------------------------------------------
// 基因序列可以表示为一条由 8 个字符组成的字符串，其中每个字符都是 'A'、'C'、'G' 和 'T' 之一。
// 假设我们需要调查从基因序列 startGene 变为 endGene 的基因变化。一次基因变化就意味着这个基因序列中的一个字符发生了变化。
// 例如，"AACCGGTT" --> "AACCGGTA" 就是一次基因变化。
// 另有一个基因库 bank 记录了所有有效的基因变化，只有在基因库中的基因才是有效的基因序列。
// 给你两个基因序列 startGene 和 endGene，以及一个基因库 bank，请你找出并返回能够使
// startGene 变化为 endGene 所需的最少变化次数。如果无法完成此基因变化，返回 -1。
//
// 示例 1：
//   输入：startGene = "AACCGGTT", endGene = "AACCGGTA", bank = ["AACCGGTA"]
//   输出：1
//
// 示例 2：
//   输入：startGene = "AACCGGTT", endGene = "AAACGGTA", bank = ["AACCGGTA","AACCGCTA","AAACGGTA"]
//   输出：2
//
// 示例 3：
//   输入：startGene = "AAAAACCC", endGene = "AACCCCCC", bank = ["AAAACCCC","AAACCCCC","AACCCCCC"]
//   输出：3

function minMutation(startGene: string, endGene: string, bank: string[]): number {
  return -1;
}

// ------------------------------------------
// 3. 单词接龙 (Word Ladder) [困难]
// ------------------------------------------
// 字典 wordList 中从单词 beginWord 到 endWord 的 转换序列 是一个按下述规格形成的序列：
// - 序列中第一个单词是 beginWord。
// - 序列中最后一个单词是 endWord。
// - 每次转换只能改变一个字母。
// - 转换过程中的中间单词必须是字典 wordList 中的单词。
// 给你两个单词 beginWord 和 endWord 和一个字典 wordList，
// 返回从 beginWord 到 endWord 的 最短转换序列 中的 单词数目。如果不存在这样的转换序列，返回 0。
//
// 示例 1：
//   输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
//   输出：5（"hit" -> "hot" -> "dot" -> "dog" -> "cog"）
//
// 示例 2：
//   输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
//   输出：0（endWord "cog" 不在字典中）

function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  return 0;
}

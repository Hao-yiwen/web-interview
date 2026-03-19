// ============================================
// 栈
// ============================================

// ------------------------------------------
// 1. 有效的括号 (Valid Parentheses) [简单]
// ------------------------------------------
// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s，判断字符串是否有效。
// 有效字符串需满足：
// 1. 左括号必须用相同类型的右括号闭合。
// 2. 左括号必须以正确的顺序闭合。
// 3. 每个右括号都有一个对应的相同类型的左括号。
//
// 示例 1：
//   输入：s = "()"
//   输出：true
//
// 示例 2：
//   输入：s = "()[]{}"
//   输出：true
//
// 示例 3：
//   输入：s = "(]"
//   输出：false
//
// 示例 4：
//   输入：s = "([])"
//   输出：true

function isValid(s: string): boolean {
  const stack: string[] = [];
  for (const c of s) {
    if (c === '(' || c === '{' || c === '[') stack.push(c);
    else {
      const top = stack[stack.length - 1];
      if (c === ')' && top === '(') stack.pop();
      else if (c === '}' && top === '{') stack.pop();
      else if (c === ']' && top === '[') stack.pop();
      else return false;
    }
  }
  return stack.length === 0;
}

// ------------------------------------------
// 2. 最小栈 (Min Stack) [中等]
// ------------------------------------------
// 设计一个支持 push、pop、top 操作，并能在常数时间内检索到最小元素的栈。
// 实现 MinStack 类：
// - MinStack() 初始化堆栈对象。
// - void push(int val) 将元素 val 推入堆栈。
// - void pop() 删除堆栈顶部的元素。
// - int top() 获取堆栈顶部的元素。
// - int getMin() 获取堆栈中的最小元素。
//
// 示例：
//   输入：["MinStack","push","push","push","getMin","pop","top","getMin"]
//         [[],[-2],[0],[-3],[],[],[],[]]
//   输出：[null,null,null,null,-3,null,0,-2]

class MinStack {
  minStack: number[];
  stack: number[];
  constructor() { this.stack = []; this.minStack = []; }
  push(val: number): void {
    this.stack.push(val);
    const curMin = this.minStack.length === 0 ? val : Math.min(val, this.minStack[this.minStack.length - 1]);
    this.minStack.push(curMin);
  }
  pop(): void { this.stack.pop(); this.minStack.pop(); }
  top(): number { return this.stack[this.stack.length - 1]; }
  getMin(): number { return this.minStack[this.minStack.length - 1]; }
}

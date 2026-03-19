// ============================================
// 链表
// ============================================

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// ------------------------------------------
// 1. 两数相加 (Add Two Numbers) [中等]
// ------------------------------------------
// 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，
// 并且每个节点只能存储 一位 数字。请你将两个数相加，并以相同形式返回一个表示和的链表。
// 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。
//
// 示例 1：
//   输入：l1 = [2,4,3], l2 = [5,6,4]
//   输出：[7,0,8]（342 + 465 = 807）
//
// 示例 2：
//   输入：l1 = [0], l2 = [0]
//   输出：[0]
//
// 示例 3：
//   输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
//   输出：[8,9,9,9,0,0,0,1]

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null,
): ListNode | null {
  const dummy = new ListNode(); let cur = dummy, carry = 0;
  while (l1 || l2 || carry) {
    const sum = (l1?.val ?? 0) + (l2?.val ?? 0) + carry;
    carry = Math.floor(sum / 10);
    cur.next = new ListNode(sum % 10); cur = cur.next;
    l1 = l1?.next ?? null; l2 = l2?.next ?? null;
  }
  return dummy.next;
}

// ------------------------------------------
// 2. 合并两个有序链表 (Merge Two Sorted Lists) [简单]
// ------------------------------------------
// 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
//
// 示例 1：
//   输入：l1 = [1,2,4], l2 = [1,3,4]
//   输出：[1,1,2,3,4,4]
//
// 示例 2：
//   输入：l1 = [], l2 = []
//   输出：[]
//
// 示例 3：
//   输入：l1 = [], l2 = [0]
//   输出：[0]

function mergeTwoLists(
  l1: ListNode | null,
  l2: ListNode | null,
): ListNode | null {
  const dummy = new ListNode(); let cur = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) { cur.next = l1; l1 = l1.next; }
    else { cur.next = l2; l2 = l2.next; }
    cur = cur.next;
  }
  cur.next = l1 ?? l2;
  return dummy.next;
}

// ------------------------------------------
// 3. 反转链表 II (Reverse Linked List II) [中等]
// ------------------------------------------
// 给你单链表的头指针 head 和两个整数 left 和 right，其中 left <= right。
// 请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表。
//
// 示例 1：
//   输入：head = [1,2,3,4,5], left = 2, right = 4
//   输出：[1,4,3,2,5]
//
// 示例 2：
//   输入：head = [5], left = 1, right = 1
//   输出：[5]

function reverseBetween(
  head: ListNode | null,
  left: number,
  right: number,
): ListNode | null {
  const dummy = new ListNode(0, head); let pre: ListNode = dummy;
  for (let i = 1; i < left; i++) pre = pre.next!;
  let cur = pre.next!;
  for (let i = 0; i < right - left; i++) {
    const next = cur.next!;
    cur.next = next.next; next.next = pre.next; pre.next = next;
  }
  return dummy.next;
}

// ------------------------------------------
// 4. K 个一组翻转链表 (Reverse Nodes in k-Group) [困难]
// ------------------------------------------
// 给你链表的头节点 head，每 k 个节点一组进行翻转，请你返回修改后的链表。
// k 是一个正整数，它的值小于或等于链表的长度。
// 如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
// 你不能只是单纯地改变节点内部的值，而是需要实际进行节点交换。
//
// 示例 1：
//   输入：head = [1,2,3,4,5], k = 2
//   输出：[2,1,4,3,5]
//
// 示例 2：
//   输入：head = [1,2,3,4,5], k = 3
//   输出：[3,2,1,4,5]

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  const dummy = new ListNode(0, head); let pre: ListNode = dummy;
  while (true) {
    let check: ListNode | null = pre;
    for (let i = 0; i < k; i++) { check = check?.next ?? null; if (!check) return dummy.next; }
    let cur = pre.next!;
    for (let i = 0; i < k - 1; i++) {
      const next = cur.next!; cur.next = next.next; next.next = pre.next; pre.next = next;
    }
    pre = cur;
  }
}

// ------------------------------------------
// 5. 删除链表的倒数第 N 个结点 (Remove Nth Node From End of List) [中等]
// ------------------------------------------
// 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
//
// 示例 1：
//   输入：head = [1,2,3,4,5], n = 2
//   输出：[1,2,3,5]
//
// 示例 2：
//   输入：head = [1], n = 1
//   输出：[]
//
// 示例 3：
//   输入：head = [1,2], n = 1
//   输出：[1]

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  const dummy = new ListNode(0, head);
  let fast: ListNode | null = dummy, slow: ListNode | null = dummy;
  for (let i = 0; i <= n; i++) fast = fast?.next ?? null;
  while (fast) { fast = fast.next; slow = slow!.next; }
  slow!.next = slow!.next?.next ?? null;
  return dummy.next;
}

// ------------------------------------------
// 6. LRU 缓存 (LRU Cache) [中等]
// ------------------------------------------
// 请你设计并实现一个满足 LRU (最近最少使用) 缓存约束的数据结构。
// 实现 LRUCache 类：
// - LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
// - int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1。
// - void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value；
//   如果不存在，则向缓存中插入该组 key-value。如果插入操作导致关键字数量超过 capacity，
//   则应该 逐出 最久未使用的关键字。
// 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。
//
// 示例：
//   输入：["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
//         [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
//   输出：[null, null, null, 1, null, -1, null, -1, 3, 4]

class LRUCache {
  private capacity: number;
  private map: Map<number, number>;
  private order: number[];

  constructor(capacity: number) { this.capacity = capacity; this.map = new Map(); this.order = []; }

  get(key: number): number {
    if (!this.map.has(key)) return -1;
    const idx = this.order.indexOf(key);
    this.order.splice(idx, 1); this.order.push(key);
    return this.map.get(key)!;
  }

  put(key: number, value: number): void {
    if (this.map.has(key)) { this.order.splice(this.order.indexOf(key), 1); }
    else if (this.map.size >= this.capacity) { this.map.delete(this.order.shift()!); }
    this.map.set(key, value); this.order.push(key);
  }
}

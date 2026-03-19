// ============================================
// 分治
// ============================================

// 注意：TreeNode 定义见 09_binary_tree.ts，ListNode 定义见 08_linked_list.ts

// ------------------------------------------
// 1. 合并 K 个升序链表 (Merge k Sorted Lists) [困难]
// ------------------------------------------
// 给你一个链表数组，每个链表都已经按升序排列。请你将所有链表合并到一个升序链表中，返回合并后的链表。
//
// 示例 1：
//   输入：lists = [[1,4,5],[1,3,4],[2,6]]
//   输出：[1,1,2,3,4,4,5,6]
//
// 示例 2：
//   输入：lists = []
//   输出：[]
//
// 示例 3：
//   输入：lists = [[]]
//   输出：[]

function mergeKLists(lists: (ListNode | null)[]): ListNode | null {
  if (!lists.length) return null;
  function merge(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const dummy = new ListNode(); let cur = dummy;
    while (l1 && l2) {
      if (l1.val <= l2.val) { cur.next = l1; l1 = l1.next; }
      else { cur.next = l2; l2 = l2.next; }
      cur = cur.next;
    }
    cur.next = l1 ?? l2;
    return dummy.next;
  }
  function divide(arr: (ListNode | null)[], l: number, r: number): ListNode | null {
    if (l === r) return arr[l];
    const mid = Math.floor((l + r) / 2);
    return merge(divide(arr, l, mid), divide(arr, mid + 1, r));
  }
  return divide(lists, 0, lists.length - 1);
}

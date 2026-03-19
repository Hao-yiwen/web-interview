// ============================================
// 二分查找
// ============================================

// ------------------------------------------
// 1. 搜索旋转排序数组 (Search in Rotated Sorted Array) [中等]
// ------------------------------------------
// 整数数组 nums 按升序排列，数组中的值 互不相同。
// 在传递给函数之前，nums 在预先未知的某个下标 k 上进行了 旋转，
// 使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]。
// 例如，[0,1,2,4,5,6,7] 在下标 3 处旋转后变为 [4,5,6,7,0,1,2]。
// 给你旋转后的数组 nums 和一个整数 target，如果 nums 中存在这个目标值，则返回它的下标，否则返回 -1。
// 你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。
//
// 示例 1：
//   输入：nums = [4,5,6,7,0,1,2], target = 0
//   输出：4
//
// 示例 2：
//   输入：nums = [4,5,6,7,0,1,2], target = 3
//   输出：-1
//
// 示例 3：
//   输入：nums = [1], target = 0
//   输出：-1

function searchRotated(nums: number[], target: number): number {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const mid = (l + r) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[l] <= nums[mid]) {
      if (nums[l] <= target && target < nums[mid]) r = mid - 1; else l = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[r]) l = mid + 1; else r = mid - 1;
    }
  }
  return -1;
}

// ------------------------------------------
// 2. 在排序数组中查找元素的第一个和最后一个位置 (Find First and Last Position of Element in Sorted Array) [中等]
// ------------------------------------------
// 给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。
// 请你找出给定目标值在数组中的开始位置和结束位置。
// 如果数组中不存在目标值 target，返回 [-1, -1]。
// 你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。
//
// 示例 1：
//   输入：nums = [5,7,7,8,8,10], target = 8
//   输出：[3,4]
//
// 示例 2：
//   输入：nums = [5,7,7,8,8,10], target = 6
//   输出：[-1,-1]
//
// 示例 3：
//   输入：nums = [], target = 0
//   输出：[-1,-1]

function searchRange(nums: number[], target: number): number[] {
  const findFirst = () => {
    let l = 0, r = nums.length - 1, res = -1;
    while (l <= r) {
      const mid = (l + r) >> 1;
      if (nums[mid] === target) { res = mid; r = mid - 1; }
      else if (nums[mid] < target) l = mid + 1; else r = mid - 1;
    }
    return res;
  };
  const findLast = () => {
    let l = 0, r = nums.length - 1, res = -1;
    while (l <= r) {
      const mid = (l + r) >> 1;
      if (nums[mid] === target) { res = mid; l = mid + 1; }
      else if (nums[mid] < target) l = mid + 1; else r = mid - 1;
    }
    return res;
  };
  return [findFirst(), findLast()];
}

// ------------------------------------------
// 3. 寻找旋转排序数组中的最小值 (Find Minimum in Rotated Sorted Array) [中等]
// ------------------------------------------
// 已知一个长度为 n 的数组，预先按照升序排列，经由 1 到 n 次 旋转 后，得到输入数组。
// 注意，旋转数组 [a[0], a[1], ..., a[n-1]] 一次的结果为 [a[n-1], a[0], a[1], ..., a[n-2]]。
// 给你一个元素值 互不相同 的数组 nums，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。
// 请你找出并返回数组中的 最小元素。你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。
//
// 示例 1：
//   输入：nums = [3,4,5,1,2]
//   输出：1
//
// 示例 2：
//   输入：nums = [4,5,6,7,0,1,2]
//   输出：0
//
// 示例 3：
//   输入：nums = [11,13,15,17]
//   输出：11

function findMin(nums: number[]): number {
  let l = 0, r = nums.length - 1;
  while (l < r) {
    const mid = (l + r) >> 1;
    if (nums[mid] > nums[r]) l = mid + 1; else r = mid;
  }
  return nums[l];
}

// ------------------------------------------
// 4. 寻找两个正序数组的中位数 (Median of Two Sorted Arrays) [困难]
// ------------------------------------------
// 给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。
// 请你找出并返回这两个正序数组的 中位数。
// 算法的时间复杂度应该为 O(log (m+n))。
//
// 示例 1：
//   输入：nums1 = [1,3], nums2 = [2]
//   输出：2.00000（合并数组 = [1,2,3]，中位数 2）
//
// 示例 2：
//   输入：nums1 = [1,2], nums2 = [3,4]
//   输出：2.50000（合并数组 = [1,2,3,4]，中位数 (2+3)/2 = 2.5）

function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
  const m = nums1.length, n = nums2.length;
  let l = 0, r = m;
  while (l <= r) {
    const i = (l + r) >> 1;
    const j = Math.floor((m + n + 1) / 2) - i;
    const maxL1 = i === 0 ? -Infinity : nums1[i - 1];
    const minR1 = i === m ? Infinity : nums1[i];
    const maxL2 = j === 0 ? -Infinity : nums2[j - 1];
    const minR2 = j === n ? Infinity : nums2[j];
    if (maxL1 <= minR2 && maxL2 <= minR1) {
      if ((m + n) % 2 === 1) return Math.max(maxL1, maxL2);
      return (Math.max(maxL1, maxL2) + Math.min(minR1, minR2)) / 2;
    } else if (maxL1 > minR2) r = i - 1; else l = i + 1;
  }
  return 0;
}

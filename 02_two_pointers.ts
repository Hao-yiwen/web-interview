// ============================================
// 双指针
// ============================================

// ------------------------------------------
// 4. 盛最多水的容器 (Container With Most Water) [中等]
// ------------------------------------------
// 给定一个长度为 n 的整数数组 height。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i])。
// 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。返回容器可以储存的最大水量。
// 注意：你不能倾斜容器。
//
// 示例 1：
//   输入：height = [1,8,6,2,5,4,8,3,7]
//   输出：49（选择第 2 条线和第 9 条线，面积 = min(8,7) * (9-2) = 49）
//
// 示例 2：
//   输入：height = [1,1]
//   输出：1

function maxArea(height: number[]): number {
  let l = 0, r = height.length - 1, res = 0;
  while (l < r) {
    res = Math.max(res, Math.min(height[l], height[r]) * (r - l));
    if (height[l] < height[r]) l++; else r--;
  }
  return res;
}

// ------------------------------------------
// 5. 三数之和 (3Sum) [中等]
// ------------------------------------------
// 给你一个整数数组 nums，判断是否存在三元组 [nums[i], nums[j], nums[k]]
// 满足 i != j、i != k 且 j != k，同时还满足 nums[i] + nums[j] + nums[k] == 0。
// 请你返回所有和为 0 且不重复的三元组。注意：答案中不可以包含重复的三元组。
//
// 示例 1：
//   输入：nums = [-1,0,1,2,-1,-4]
//   输出：[[-1,-1,2],[-1,0,1]]
//
// 示例 2：
//   输入：nums = [0,1,1]
//   输出：[]
//
// 示例 3：
//   输入：nums = [0,0,0]
//   输出：[[0,0,0]]

function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        res.push([nums[i], nums[l], nums[r]]);
        while (l < r && nums[l] === nums[l + 1]) l++;
        while (l < r && nums[r] === nums[r - 1]) r--;
        l++; r--;
      } else if (sum < 0) l++; else r--;
    }
  }
  return res;
}

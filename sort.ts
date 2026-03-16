// 快速排序
function QuickSort(nums: number[]): void {
  QuickRec(nums, 0, nums.length - 1);
}

function QuickRec(nums: number[], left: number, right: number): void {
  if (left < right) {
    let pivotIndex = Partition(nums, left, right);
    QuickRec(nums, left, pivotIndex - 1);
    QuickRec(nums, pivotIndex + 1, right);
  }
}

function Partition(nums: number[], left: number, right: number): number {
  let pivot = nums[right];
  let j = left - 1;
  for (let i = left; i <= right; i++) {
    if (nums[i] < pivot) {
      j++;
      [nums[j], nums[i]] = [nums[i], nums[j]];
    }
  }
  [nums[j + 1], nums[right]] = [nums[right], nums[j + 1]];
  return j + 1;
}

// 归并排序
function MergeSort(nums: number[]): number[] {
  if (nums.length <= 1) return nums;
  let mid = Math.floor(nums.length / 2);
  let left = MergeSort(nums.slice(0, mid));
  let right = MergeSort(nums.slice(mid));
  return Merge(left, right);
}

function Merge(left: number[], right: number[]): number[] {
  let l = 0,
    r = 0,
    res = [];
  while (l < left.length && r < right.length) {
    if (left[l] < right[l]) {
      res.push(left[l++]);
    } else {
      res.push(right[r++]);
    }
  }
  while (l < left.length) res.push(left[l++]);
  while (r < right.length) res.push(right[r++]);
  return res;
}

// 插入排序
function InsertSort(nums: number[]) {
  for (let i = 1; i < nums.length; i++) {
    let key = nums[i];
    let j = i - 1;
    while (j >= 0 && key <= nums[j]) {
      nums[j + 1] = nums[j];
      j--;
    }
    nums[j + 1] = key;
  }
}

// 冒泡排序
function BuddleSort(nums: number[]) {
  for (let i = 0; i < nums.length; i++) {
    let swap = false;
    for (let j = 0; j < nums.length - i - 1; j++) {
      if (nums[j] > nums[j + 1]) {
        swap = true;
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
      }
    }
    if (!swap) {
      break;
    }
  }
}

// 堆排序
function HeapSort(nums: number[]) {
  // 建堆
  let len = nums.length;

  for (let i = Math.floor(nums.length / 2); i >= 0; i--) {
    Heapify(nums, len, i);
  }
  // 排序
  for (let i = len - 1; i >= 0; i--) {
    [nums[0], nums[i]] = [nums[i], nums[0]];
    Heapify(nums, i, 0);
  }
}

function Heapify(nums: number[], n: number, i: number) {
  let largest = i;
  let left = 2 * largest + 1;
  let right = 2 * largest + 2;
  if (left < n && nums[largest] < nums[left]) {
    largest = left;
  }
  if (right < n && nums[largest] < nums[right]) {
    largest = right;
  }
  if (largest != i) {
    [nums[largest], nums[i]] = [nums[i], nums[largest]];
    Heapify(nums, n, largest);
  }
}

function main() {
  let nums = [5, 4, 3, 2, 1];
  console.log("排序前:", nums);
  BuddleSort(nums);
  console.log("排序后:", nums);
}

main();

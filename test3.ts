function QuickSort(arr: number[]) {
  QuickSortResc(arr, 0, arr.length - 1);
}

function QuickSortResc(arr: number[], start: number, end: number) {
  if (start < end) {
    const pivotIndex = Partition(arr, start, end);
    QuickSortResc(arr, start, pivotIndex - 1);
    QuickSortResc(arr, pivotIndex + 1, end);
  }
}

function Partition(arr: number[], start: number, end: number): number {
  let pivot = arr[end];
  let j = start - 1;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivot) {
      j++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[j + 1], arr[end]] = [arr[end], arr[j + 1]];
  return j + 1;
}

function MergeSort(arr) {
  if (arr.length <= 1) return arr;
  let mid = arr.length >> 1;
  let left = MergeSort(arr.slice(0, mid));
  let right = MergeSort(arr.slice(mid));
  return Merge(left, right);
}

function Merge(left: number[], right: number[]) {
  let l = 0,
    r = 0;
  let res = [];
  while (l < left.length && r < right.length) {
    if (left[l] < right[r]) {
      res.push(left[l++]);
    } else {
      res.push(right[r++]);
    }
  }
  while (l < left.length) res.push(left[l++]);
  while (r < right.length) res.push(right[r++]);
  return res;
}

function HeapSort(arr: number[]) {
  let n = arr.length;
  for (let i = arr.length >> 1; i >= 0; i--) {
    Heapify(arr, n, i);
  }

  for (let i = n - 1; i >= 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    Heapify(arr, i, 0);
  }
}

function Heapify(arr: number[], n: number, l: number) {
  let largets = l;
  let left = largets * 2 + 1;
  let right = largets * 2 + 2;
  if (left < n && arr[largets] < arr[left]) {
    largets = left;
  }
  if (right < n && arr[largets] < arr[right]) {
    largets = right;
  }
  if (largets != l) {
    [arr[largets], arr[l]] = [arr[l], arr[largets]];
    Heapify(arr, n, largets);
  }
}

function BuddleSort(arr: number[]) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
}

function InsertSort(arr: number[]) {
  for (let i = 1; i < arr.length; i++) {
    const tp = arr[i];
    let k = i - 1;
    while (k>=0 && arr[k] > tp) {
      arr[k + 1] = arr[k];
      k--;
    }
    arr[k+1] = tp;
  }
}

function main() {
  let arr = [5, 4, 3, 2, 1];
  InsertSort(arr);
  console.log(arr);
}

main();

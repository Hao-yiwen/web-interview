function myPow(x: number, n: number): number {
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }
  let res = 1;
  while (n > 0) {
    if (n & 1) res *= x;
    x = x * x;
    n >>= 1;
  }
  return res;
}

function singleNumber(nums: number[]): number {
  let result = 0
  for(const num of nums){
    result ^= num
  }
  return result
}
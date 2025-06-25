boolean isSubsetSum(int set[], int n, int sum) {
  if (sum == 0) {
    return true;
  }
  if ((n == 0) && (sum != 0)) {
    return false;
  }
  return isSubsetSum(set, n - 1, sum) || isSubsetSum(set, n - 1, sum - set[n - 1]);	
}

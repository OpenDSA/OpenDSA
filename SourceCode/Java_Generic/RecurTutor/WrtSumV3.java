int sum(int arr[], int n) {
  if (n == 0) {
    return 0;
  } else {
    return sum(arr, n - 1) + arr[n - 1];
  }
}

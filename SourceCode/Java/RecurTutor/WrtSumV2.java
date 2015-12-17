int sum(int arr[], int n) {
  if (n == 0) {
    result = 0;
  } else {
    int smallResult = sum(arr, n - 1);
    result = smallResult + arr[n - 1];
  }
  return result;
}

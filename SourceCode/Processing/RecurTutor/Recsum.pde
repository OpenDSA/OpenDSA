int sum( int arr[], int n ) {
  if ( n == 0 )
    return 0;
  else {
    int smallResult = sum(arr, n - 1);
    return smallResult + arr[n - 1];
  }
}

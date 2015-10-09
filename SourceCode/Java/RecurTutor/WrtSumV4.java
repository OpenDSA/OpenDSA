int sum(int arr[], int size){
  if (size > 0)
    return sum(arr, size - 1 ) + arr[size - 1];
  return 0;
}

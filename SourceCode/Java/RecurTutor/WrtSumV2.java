int sum(int arr[], int size){
  if (size == 0)
    result = 0;
  else {
    int smallResult = sum(arr, size-1);
    result = smallResult + arr[size-1];
  }
  return result;
}

int sum(int arr[], int size){
  if (size == 0)
    return 0;
  else{   
	int smallResult = sum(arr, size-1);
	return smallResult + arr[size-1];
  }
}

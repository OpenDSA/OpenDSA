void sorttest(Integer[] A) {
  quicksort(A, 0, A.length-1);
}

/* Warning: Partition is sensitive. If we don't make the right
   position actually cross the left, then it seems hard to get things
   to work right when there is only one element in the partition
   (i.e., a list of 2 elements). */
/* *** ODSATag: partition *** */
int partition(Integer[] A, int left, int right, int pivot) {
  while (left <= right) { // Move bounds inward until they meet
    while (A[left] < pivot) left++;
    while ((right >= left) && (A[right] >= pivot)) right--;
    if (right > left) swap(A, left, right); // Swap out-of-place values
  }
  return left;            // Return first position in right partition
}
/* *** ODSAendTag: partition *** */

/* *** ODSATag: findpivot *** */
int findpivot(Integer[] A, int i, int j)
  { return (i+j)/2; }
/* *** ODSAendTag: findpivot *** */

/* *** ODSATag: Quicksort *** */
void quicksort(Integer[] A, int i, int j) { // Quicksort
  int pivotindex = findpivot(A, i, j);  // Pick a pivot
  swap(A, pivotindex, j);               // Stick pivot at end
  // k will be the first position in the right subarray
  int k = partition(A, i, j-1, A[j]);
  swap(A, k, j);                        // Put pivot in place
  if ((k-i) > 1) quicksort(A, i, k-1);  // Sort left partition
  if ((j-k) > 1) quicksort(A, k+1, j);  // Sort right partition
}
/* *** ODSAendTag: Quicksort *** */

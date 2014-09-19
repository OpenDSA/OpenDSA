// Return the position of an element in sorted array A
// with value k.  If k is not in A, return size.
int binary(int A[], int size, int k) {
  int l = -1;
  int r = size;                  // l and r are beyond array bounds
  while (l+1 != r) {             // Stop when l and r meet
    int mid = (l+r)/2;           // Check middle of remaining subarray
    if (k < A[mid]) r = mid;     // In left half
    if (k == A[mid]) return mid; // Found it
    if (k > A[mid]) l = mid;     // In right half
  }
  return size;                   // Search value not in A
}

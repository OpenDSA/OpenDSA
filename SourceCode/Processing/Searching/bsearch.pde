// Return the position of an element in sorted array A
// with value k.  If k is not in A, return A.length.
int binary(int[] A, int k) {
  int l = -1;
  int r = A.length;   // l and r are beyond array bounds
  while (l+1 != r) {  // Stop when l and r meet
    int i = (l+r)/2;  // Check middle of remaining subarray
    if (k < A[i]) r = i;     // In left half
    if (k == A[i]) return i; // Found it
    if (k > A[i]) l = i;     // In right half
  }
  return A.length;    // Search value not in A
}

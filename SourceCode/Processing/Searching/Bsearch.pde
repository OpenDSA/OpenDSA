// Tested from "Misc/Anal.pde"
/* *** ODSATag: BinarySearch *** */
// Return the position of an element in sorted array A with value K.
// If K is not in A, return A.length.
int binarySearch(int[] A, int K) {
  int low = 0;
  int high = A.length - 1;
  while (low <= high) {                 // Stop when low and high meet
    int mid = (low + high) / 2;         // Check middle of subarray
    if( A[mid] < K) low = mid + 1;      // In right half
    else if(A[mid] > K) high = mid - 1; // In left half
    else return mid;                    // Found it
  }
  return A.length;                      // Search value not in A
}
/* *** ODSAendTag: BinarySearch *** */

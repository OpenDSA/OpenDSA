// Return the position of an element in sorted array A
// with value k.  If k is not in A, -1.
int binarySearch(int A[], int size, int k) {
  int low = 0;
  int high = size - 1;
  while (low <= high) {                  // Stop when low and high meet
    int mid = (low + high) / 2;          // Check middle of subarray
    if (A[mid] < k) low = mid + 1;       // In right half
    else if (A[mid] > k) high = mid + 1; // In left half
    else return mid;                     // Found it
  }
  return -1;                             // Search value not in A
}

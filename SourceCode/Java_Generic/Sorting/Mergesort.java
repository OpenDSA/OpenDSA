/* *** ODSATag: Mergesort *** */
static <T extends Comparable<T>> void mergesort(T[] A, T[] temp, int left, int right) {
  if (left == right) { return; }       // List has one record
  int mid = (left+right)/2;          // Select midpoint
  mergesort(A, temp, left, mid);     // Mergesort first half
  mergesort(A, temp, mid+1, right);  // Mergesort second half
  for (int i=left; i<=right; i++) {    // Copy subarray to temp
    temp[i] = A[i];
  }
  // Do the merge operation back to A
  int i1 = left;
  int i2 = mid + 1;
  for (int curr = left; curr <= right; curr++) {
    if (i1 == mid+1) {                 // Left sublist exhausted
      A[curr] = temp[i2++];
    }
    else if (i2 > right) {             // Right sublist exhausted
      A[curr] = temp[i1++];
    }
    else if (temp[i1].compareTo(temp[i2]) <= 0) {  // Get smaller value
      A[curr] = temp[i1++];
    }
    else{
      A[curr] = temp[i2++];
    }
  }
}
/* *** ODSAendTag: Mergesort *** */

/* *** ODSATag: MergesortOpt *** */
static <T extends Comparable<T>> void mergesortOpt(T[] A, T[] temp, int left, int right) {
  int i, j, k, mid = (left+right)/2;  // Select the midpoint
  if (left == right) { return; }          // List has one record
  if ((mid-left) >= THRESHOLD) { mergesortOpt(A, temp, left, mid); }
  else { inssort(A, left, mid); }
  if ((right-mid) > THRESHOLD) { mergesortOpt(A, temp, mid+1, right); }
  else { inssort(A, mid+1, right); }
  // Do the merge operation.  First, copy 2 halves to temp.
  for (i=left; i<=mid; i++) { temp[i] = A[i]; }
  for (j=right; j>mid; j--) { temp[i++] = A[j]; }
  // Merge sublists back to array
  for (i=left,j=right,k=left; k<=right; k++) {
    if (temp[i].compareTo(temp[j]) <= 0) { A[k] = temp[i++]; }
    else { 
      A[k] = temp[j--];
    }
  }
}
/* *** ODSAendTag: MergesortOpt *** */

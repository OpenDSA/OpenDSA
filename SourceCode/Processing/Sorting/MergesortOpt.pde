void sorttest(Comparable[] A) {
  Comparable[] temp = new Comparable[A.length];
  mergesort(A, temp, 0, A.length-1);
}

void inssort(Comparable[] A, int left, int right) {
  for (int i=left+1; i<=right; i++)        // Insert i'th record
    for (int j=i; (j>left) && (A[j].compareTo(A[j-1]) < 0); j--)
      swap(A, j, j-1);
}

/* *** ODSATag: MergesortOpt *** */
void mergesort(Comparable[] A, Comparable[] temp, int left, int right) {
  int i, j, k, mid = (left+right)/2;  // Select the midpoint
  if (left == right) return;          // List has one record
  if ((mid-left) >= THRESHOLD) mergesort(A, temp, left, mid);
  else inssort(A, left, mid);
  if ((right-mid) > THRESHOLD) mergesort(A, temp, mid+1, right);
  else inssort(A, mid+1, right);
  // Do the merge operation.  First, copy 2 halves to temp.
  for (i=left; i<=mid; i++) temp[i] = A[i];
  for (j=right; j>mid; j--) temp[i++] = A[j];
  // Merge sublists back to array
  for (i=left,j=right,k=left; k<=right; k++)
    if (temp[i].compareTo(temp[j]) < 0) A[k] = temp[i++];
    else A[k] = temp[j--];
}
/* *** ODSAendTag: MergesortOpt *** */

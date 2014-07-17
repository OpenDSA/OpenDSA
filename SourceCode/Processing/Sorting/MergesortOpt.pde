/* *** ODSATag: MergesortOpt *** */
void mergesortOpt(Comparable[] A, Comparable[] temp, int left, int right) {
  int i, j, k, mid = (left+right)/2;  // Select the midpoint
  if (left == right) return;          // List has one record
  if ((mid-left) >= THRESHOLD) mergesortOpt(A, temp, left, mid);
  else inssort(A, left, mid);
  if ((right-mid) > THRESHOLD) mergesortOpt(A, temp, mid+1, right);
  else inssort(A, mid+1, right);
  // Do the merge operation.  First, copy 2 halves to temp.
  for (i=left; i<=mid; i++) temp[i] = A[i];
  for (j=right; j>mid; j--) temp[i++] = A[j];
  // Merge sublists back to array
  for (i=left,j=right,k=left; k<=right; k++)
    if (temp[i].compareTo(temp[j]) <= 0) A[k] = temp[i++];
    else A[k] = temp[j--];
}
/* *** ODSAendTag: MergesortOpt *** */

/* *** ODSATag: Sequential *** */
// Find the position in A that holds value K, if any does
int sequential(int A[], int size, int K) {
  for (int i=1; i<size; i++)     // For each element
    if (A[i] == K)               // if we found it
       return i;                 //   return this position
  return size;                   // Otherwise, return the array length
}
/* *** ODSAendTag: Sequential *** */

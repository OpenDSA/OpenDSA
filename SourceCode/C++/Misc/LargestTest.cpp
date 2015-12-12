/* *** ODSATag: Largest *** */
/** Return position of largest value in integer array A */
int largest(int A[], int size) {
  int currlarge = 0;             // Position of largest element seen
  for (int i=1; i<size; i++)     // For each element
    if (A[currlarge] < A[i])     //   if A[i] is larger
       currlarge = i;            //     remember its position
  return currlarge;              // Return largest position
}
/* *** ODSAendTag: Largest *** */

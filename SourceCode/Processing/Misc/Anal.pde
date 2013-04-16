/* *** ODSATag: Largest *** */
/** @return Position of largest value in  array A */
static int largest(int[] A) {
  int currlarge = 0; // Holds largest element position
  for (int i=1; i<A.length; i++)   // For each element
    if (A[currlarge] < A[i])      // if A[i] is larger
       currlarge = i;       //   remember its position
  return currlarge;         // Return largest position
}
/* *** ODSAendTag: Largest *** */

/* *** ODSATag: Analp1 *** */
sum = 0;
for (i=1; i<=n; i++)
  for (j=1; j<=n; j++)
    sum++;
/* *** ODSAendTag: Analp1 *** */

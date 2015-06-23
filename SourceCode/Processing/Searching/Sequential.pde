// Tested from "Misc/Anal.pde"
/* *** ODSATag: Sequential *** */
// Return the position of an element in array A with value K.
// If K is not in A, return A.length.
int sequential(int[] A, int K) {
  for (int i=1; i<A.length; i++) // For each element
    if (A[i] == K)               // if we found it
       return i;                 //   return this position
  return A.length;               // Otherwise, return the array length
}
/* *** ODSAendTag: Sequential *** */

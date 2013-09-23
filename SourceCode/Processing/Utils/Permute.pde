/* *** ODSATag: Permute *** */
// Randomly permute the values in array A
void permute(Object[] A) {
  for (int i = A.length; i > 0; i--) // for each i
    swap(A, i-1, int(random(i)));    //   swap A[i-1] with a random
}                                    //   position in the range 0 to i-1.
/* *** ODSAendTag: Permute *** */

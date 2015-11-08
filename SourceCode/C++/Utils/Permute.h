/* *** ODSATag: Permute *** */
//Randomly permute the values in array A
void permute(int A[], int n) {
  for (int i = n; i > 0; i--) // for each i
    swap(A, i-1, int(Random(i)));    //   swap A[i-1] with a random
                                     //   position in the range 0 to i-1.
}
/* *** ODSAendTag: Permute *** */

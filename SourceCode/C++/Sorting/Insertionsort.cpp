/* *** ODSATag: InsertionOpt *** */
// Instead of swapping, "shift" the values down the array
template <typename E, typename Comp>
void inssortshift(E A[], int n) { // Insertion Sort
  for (int i=1; i<n; i++) { // Insert i'th record
    int j;
    Comparable temp = A[i];
    for (int j=i; (j>0) && (Comp::prior(temp, A[j-1])); j--)
      A[j] = A[j-1];
    A[j] = temp;
  }
}
/* *** ODSAendTag: InsertionOpt *** */


/* *** ODSATag: Insertionsort *** */
template <typename E, typename Comp>
void inssort(E A[], int n) { // Insertion Sort
  for (int i=1; i<n; i++)       // Insert i'th record
    for (int j=i; (j>0) && (Comp::prior(A[j], A[j-1])); j--)
      swap(A, j, j-1);
}
/* *** ODSAendTag: Insertionsort *** */

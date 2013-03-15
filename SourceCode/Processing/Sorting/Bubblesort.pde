void sorttest(int[] A) {
  bubblesort(A);
}

/* *** ODSATag: Bubblesort *** */
void bubblesort(int[] A) {
  for (int i=0; i<A.length-1; i++) // Insert i'th record
    for (int j=1; j<A.length-i; j++)
      if (A[j-1] > A[j])
        swap(A, j-1, j);
}
/* *** ODSAendTag: Bubblesort *** */

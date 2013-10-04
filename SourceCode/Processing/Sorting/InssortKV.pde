void sorttest(KVPair[] A) {
  inssort(A);
}


/* *** ODSATag: InssortKV *** */
void inssort(Comparable[] A) {
  for (int i=1; i<A.length; i++) // Insert i'th record
    for (int j=i; (j>0) && (A[j].compareTo(A[j-1]) < 0); j--)
      swap(A, j, j-1);
}
/* *** ODSAendTag: InssortKV *** */

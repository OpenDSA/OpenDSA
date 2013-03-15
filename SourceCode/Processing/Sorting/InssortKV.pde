void sorttest(KVPair[] A) {
  inssort(A);
}


/* *** ODSATag: InssortKV *** */
void inssort(KVPair[] A) {
  for (int i=1; i<A.length; i++) // Insert i'th record
    for (int j=i; (j>0) && (A[j].key() < A[j-1].key()); j--)
      swap(A, j, j-1);
}
/* *** ODSAendTag: InssortKV *** */

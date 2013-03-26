void sorttest(int[] A) {
  selsort(A);
}

/* *** ODSATag: Selectionsort *** */
void selsort(int[] A) {
  for (int i=0; i<A.length-1; i++) { // Select i'th biggest record
    int bigindex = 0;                // Current biggest index
    for (int j=1; j<A.length-i; j++) // Find the max value
      if (A[j] > A[bigindex])        // Found something bigger  
        bigindex = j;                // Remember bigger index
    swap(A, bigindex, A.length-i-1); // Put it into place
  }
}
/* *** ODSAendTag: Selectionsort *** */

static void sorttime(int[] B) {
  int i;
  int[] A = new int[B.length];

  for(i=0; i<B.length; i++) A[i] = B[i];
  makenew(A);
  time1 = millis();
  selsort(A);
  time2 = millis();
  checkorder(A);
  println("Standard Selection Sort: Size " + testsize + ", Time: " + (time2-time1));

  for(i=0; i<B.length; i++) A[i] = B[i];
  makenew(A);
  time1 = millis();
  selsortcheck(A);
  time2 = millis();
  checkorder(A);
  println("Standard Selection Sort: Size " + testsize + ", Time: " + (time2-time1));
}

// Same as selsort, but check if the swap is necessary
static void selsortcheck(int[] A) {
  for (int i=0; i<A.length-1; i++) { // Select i'th biggest record
    int bigindex = 0;                // Current biggest index
    for (int j=1; j<A.length-i; j++) // Find the max value
      if (A[j] > A[bigindex])        // Found something bigger  
        bigindex = j;                // Remember bigger index
    if (bigindex != A.length-i-1)
      swap(A, bigindex, A.length-i-1); // Put it into place
  }
}

static void sorttest(int[] A) {
  selsort(A);
}

/* *** ODSATag: Selectionsort *** */
static void selsort(int[] A) {
  for (int i=0; i<A.length-1; i++) { // Select i'th biggest record
    int bigindex = 0;                // Current biggest index
    for (int j=1; j<A.length-i; j++) // Find the max value
      if (A[j] > A[bigindex])        // Found something bigger  
        bigindex = j;                // Remember bigger index
    swap(A, bigindex, A.length-i-1); // Put it into place
  }
}
/* *** ODSAendTag: Selectionsort *** */

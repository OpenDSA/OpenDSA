void sorttime(T[] B) {
    int i;
    long totaltime;
    int runs;
    double avgtime;

    totaltime = 0;
    for (runs=0; runs<numruns; runs++) {
        for (i=0; i<B.length; i++)
            A[i] = B[i];
        time1 = System.nanoTime();
        shellsort(A);
        time2 = System.nanoTime();
        checkorder(A);
        totaltime += (time2-time1);
    }
    if (!prod)
        System.out.println("Total time is: " + totaltime + ", numruns is: " + numruns);
    avgtime = (((double)totaltime)/numruns) / 1000000.0;
    System.out.println("Standard Shellsort: Size " + A.length + ", Time: " + avgtime);
}

boolean sorttest(T[] B) {
    int i;
    System.out.println("Test Shellsort");
    for (i=0; i<B.length; i++) {
        A[i] = B[i];
    }
    shellsort(A);
    if (!checkorder(A)) { return false; };
    return true;
}

/* *** ODSATag: Shellsort *** */
void shellsort(T[] A) {
  for (int i=A.length/2; i>2; i/=2) { // For each increment
    for (int j=0; j<i; j++) {         // Sort each sublist
      inssort2(A, j, i);
    }
  }
  inssort2(A, 0, 1);     // Could call regular inssort here
}

/** Modified Insertion Sort for varying increments */
void inssort2(T[] A, int start, int incr) {
  for (int i=start+incr; i<A.length; i+=incr)
    for (int j=i; (j>=incr) && (A[j].compareTo(A[j-incr]) < 0); j-=incr)
    swap(A, j, j-incr);
}
/* *** ODSAendTag: Shellsort *** */

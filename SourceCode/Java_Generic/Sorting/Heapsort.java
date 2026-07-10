void sorttime(T[] B) {
    int i;
    long totaltime;
    int runs;
    double avgtime;

    if (!prod)
        System.out.println("Doing timings for an array of size " + B.length + " on the basis of " + numruns + " runs");
  
    totaltime = 0;
    for (runs=0; runs<numruns; runs++) {
        for (i=0; i<B.length; i++) {
            A[i] = B[i];
        }
        time1 = System.nanoTime();
        heapsort(A);
        time2 = System.nanoTime();
        checkorder(A);
        totaltime += (time2-time1);
    }
    if (!prod)
        System.out.println("Total time is: " + totaltime + ", numruns is: " + numruns);
    avgtime = (((double)totaltime)/numruns) / 1000000.0;
    System.out.println("Standard Heapsort: Size " + A.length + ", Time: " + avgtime);
}


boolean sorttest(T[] B) {
    int i;
    System.out.println("Test Heapsort");
    for (i=0; i<B.length; i++) {
        A[i] = B[i];
    }
    heapsort(A);
    if (!checkorder(A)) { return false; };
    return true;
}


/* *** ODSATag: Heapsort *** */
void heapsort(T[] A) {
  // The heap constructor invokes the buildheap method
  MaxHeap<T> H = new MaxHeap<T>(A, A.length, A.length);
  for (int i=0; i<A.length; i++) {  // Now sort
    H.removeMax(); // Removemax places max at end of heap
  }
}
/* *** ODSAendTag: Heapsort *** */

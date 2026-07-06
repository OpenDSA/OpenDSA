void sorttime(int[] B) {
    int i;
    long totaltime;
    int runs;
    double avgtime;

    System.out.println("Doing timings for an array of size " + B.length + " on the basis of " + numruns + " runs");

    swaps = 0;
    compares = 0;
    totaltime = 0;
    for (runs=0; runs<numruns; runs++) {
        for (i=0; i<B.length; i++) {
            A[i] = B[i];
        }
        time1 = System.nanoTime();
        selsortinstrument(A);
        time2 = System.nanoTime();
        checkorder(A);
        totaltime += (time2-time1);
    }
    System.out.println("Total time is: " + totaltime + ", numruns is: " + numruns);
    avgtime = (((double)totaltime)/numruns) / 1000000.0;
    System.out.println("Instrumented Standard Selection Sort: Size " + A.length + ", Time: " + avgtime);
    System.out.println("Compares: " + compares/numruns + ", swaps: " + swaps/numruns);
    

    totaltime = 0;
    for (runs=0; runs<numruns; runs++) {
        for (i=0; i<B.length; i++) {
            A[i] = B[i];
        }
        time1 = System.nanoTime();
        selsort(A);
        time2 = System.nanoTime();
        checkorder(A);
        totaltime += (time2-time1);
    }
    System.out.println("Total time is: " + totaltime + ", numruns is: " + numruns);
    avgtime = (((double)totaltime)/numruns) / 1000000.0;
    System.out.println("Standard Selection Sort: Size " + A.length + ", Time: " + avgtime);

    totaltime = 0;
    for (runs=0; runs<numruns; runs++) {
        for(i=0; i<B.length; i++) {
            A[i] = B[i];
        }
        time1 = System.nanoTime();
        selsortcheck(A);
        time2 = System.nanoTime();
        checkorder(A);
        totaltime += (time2-time1);
    }
    System.out.println("Total time is: " + totaltime + ", numruns is: " + numruns);
    avgtime = (((double)totaltime)/numruns) / 1000000.0;
    System.out.println("Standard Selection Sort with Swap Check: Size " + A.length + ", Time: " + avgtime);
}


// Same as selsort, but check if the swap is necessary
void selsortcheck(int[] A) {
    for (int i=0; i<A.length-1; i++) { // Select i'th biggest record
        int bigindex = 0;                // Current biggest index
        for (int j=1; j<A.length-i; j++) // Find the max value
            if (A[j] > A[bigindex])        // Found something bigger  
                bigindex = j;                // Remember bigger index
        if (bigindex != A.length-i-1)
            swap(A, bigindex, A.length-i-1); // Put it into place
    }
}

boolean sorttest(int[] B) {
    int i;
    int[] A = new int[B.length];
    for (i=0; i<B.length; i++) {
        A[i] = B[i];
    }
    selsort(A);
    if (!checkorder(A)) return false;
    return true;
}

/* *** ODSATag: Selectionsort *** */
void selsort(int[] A) {
  for (int i=0; i<A.length-1; i++) {       // Select i'th biggest record
    int bigindex = 0;                      // Current biggest index
    for (int j=1; j < A.length-i; j++)     // Find the max value
      if (A[j] > A[bigindex])              // Found something bigger  
        bigindex = j;                      // Remember bigger index
    swap(A, bigindex, A.length-i-1);       // Put it into place
  }
}
/* *** ODSAendTag: Selectionsort *** */

void selsortinstrument(int[] A) {
  for (int i=0; i<A.length-1; i++) {       // Select i'th biggest record
    int bigindex = 0;                      // Current biggest index
    for (int j=1; j < A.length-i; j++) {   // Find the max value
      compares++;
      if (A[j] > A[bigindex])              // Found something bigger  
        bigindex = j;                      // Remember bigger index
    }
    swap(A, bigindex, A.length-i-1);       // Put it into place
    swaps++;
  }
}

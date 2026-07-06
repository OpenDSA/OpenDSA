void sorttime(T[] B) {
    int i;
    long totaltime;
    int runs;
    double avgtime;

    swaps = 0;
    compares = 0;
    totaltime = 0;
    for (runs=0; runs<numruns; runs++) {
        for (i=0; i<B.length; i++) {
            A[i] = B[i];
        }
        time1 = System.nanoTime();
        inssortinstrument(A);
        time2 = System.nanoTime();
        checkorder(A);
        totaltime += (time2-time1);
    }

    System.out.println("Doing timings for an array of size " + B.length + " on the basis of " + numruns + " runs");
    System.out.println("Total time is: " + totaltime + ", numruns is: " + numruns);
    avgtime = (((double)totaltime)/numruns) / 1000000.0;
    System.out.println("Instrumented Standard Insertion Sort: Size " + A.length + ", Time: " + avgtime);
    System.out.println("Compares: " + compares/numruns + ", swaps: " + swaps/numruns);

    totaltime = 0;
    for (runs=0; runs<numruns; runs++) {
        for (i=0; i<B.length; i++)
            A[i] = B[i];
        time1 = System.nanoTime();
        inssort(A);
        time2 = System.nanoTime();
        checkorder(A);
        totaltime += (time2-time1);
    }
    System.out.println("Total time is: " + totaltime + ", numruns is: " + numruns);
    avgtime = (((double)totaltime)/numruns) / 1000000.0;
    System.out.println("Standard Insertion Sort: Size " + A.length + ", Time: " + avgtime);

    totaltime = 0;
    for (runs=0; runs<numruns; runs++) {
        for (i=0; i<B.length; i++)
            A[i] = B[i];
        time1 = System.nanoTime();
        inssort2(A);
        time2 = System.nanoTime();
        checkorder(A);
        totaltime += (time2-time1);
    }
    System.out.println("Total time is: " + totaltime + ", numruns is: " + numruns);
    avgtime = (((double)totaltime)/numruns) / 1000000.0;
    System.out.println("Standard Insertion Sort/Inline swaps: Size " + A.length + ", Time: " + avgtime);

    totaltime = 0;
    for (runs=0; runs<numruns; runs++) {
        for(i=0; i<B.length; i++)
            A[i] = B[i];
        time1 = System.nanoTime();
        inssortshift(A);
        time2 = System.nanoTime();
        checkorder(A);
        totaltime += (time2-time1);
    }
    System.out.println("Total time is: " + totaltime + ", numruns is: " + numruns);
    avgtime = (((double)totaltime)/numruns) / 1000000.0;
    System.out.println("shuffling Insertion Sort: Size " + A.length + ", Time: " + avgtime);

    totaltime = 0;
    for (runs=0; runs<numruns; runs++) {
        for(i=0; i<B.length; i++)
            A[i] = B[i];
        time1 = System.nanoTime();
        inssortshift2(A);
        time2 = System.nanoTime();
        checkorder(A);
        totaltime += (time2-time1);
    }
    System.out.println("Total time is: " + totaltime + ", numruns is: " + numruns);
    avgtime = (((double)totaltime)/numruns) / 1000000.0;
    System.out.println("shuffling Insertion Sort 2: Size " + A.length + ", Time: " + avgtime);
}


// Same as inssortsuffle, but try != instead of < for the zero test
// This will only matter to JavaScript
void inssortshift2(T[] A) {
    for (int i=1; i!=A.length; i++) { // Insert i'th record
        int j;
        T temp = A[i];
        for (j=i; (j!=0) && (temp.compareTo(A[j-1]) < 0); j--)
            A[j] = A[j-1];
        A[j] = temp;
    }
}

/* *** ODSATag: InsertionOpt *** */
// Instead of swapping, "shift" the values down the array
void inssortshift(T[] A) {
  for (int i=1; i<A.length; i++) { // Insert i'th record
    int j;
    T temp = A[i];
    for (j=i; (j>0) && (temp.compareTo(A[j-1]) < 0); j--) {
      A[j] = A[j-1];
    }
    A[j] = temp;
  }
}
/* *** ODSAendTag: InsertionOpt *** */

// Same as standard insertion sort, except get rid of the swap
// function call
void inssort2(T[] A) {
    T temp;
    for (int i=1; i<A.length; i++) { // Insert i'th record
        for (int j=i; (j>0) && (A[j].compareTo(A[j-1]) < 0); j--) {
            temp = A[j]; A[j] = A[j-1]; A[j-1] = temp;
        }
    }
}

boolean sorttest(T[] B) {
    int i;
    System.out.println("Test Insertion Sort");
    for (i=0; i<B.length; i++) {
        A[i] = B[i];
    }
    inssort(A);
    if (!checkorder(A)) { return false; };
    return true;
}

/* *** ODSATag: Insertionsort *** */
    void inssort(T[] A) {
    for (int i=1; i<A.length; i++) // Insert i'th record
        for (int j=i; (j>0) && (A[j].compareTo(A[j-1]) < 0); j--)
            swap(A, j, j-1);
}
/* *** ODSAendTag: Insertionsort *** */

// Standard insertion sort instrumented to count swaps and compares
void inssortinstrument(T[] A) {
    int j;
    for (int i=1; i<A.length; i++) { // Insert i'th record
        for (j=i; (j>0) && (A[j].compareTo(A[j-1]) < 0); j--) {
            swaps++;
            compares++;
            swap(A, j, j-1);
        }
        if (j != 0) compares++;
    }
}

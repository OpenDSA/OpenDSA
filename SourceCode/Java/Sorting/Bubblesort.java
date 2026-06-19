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
        bubblesortinstrument(A);
        time2 = System.nanoTime();
        checkorder(A);
        totaltime += (time2-time1);
    }
    System.out.println("Total time is: " + totaltime + ", numruns is: " + numruns);
    avgtime = (((double)totaltime)/numruns) / 1000000.0;
    System.out.println("Instrumented Standard Bubble Sort: Size " + A.length + ", Time: " + avgtime);
    System.out.println("Compares: " + compares/numruns + ", swaps: " + swaps/numruns);
    
    totaltime = 0;
    for (runs=0; runs<numruns; runs++) {
        for (i=0; i<B.length; i++) {
            A[i] = B[i];
        }
        time1 = System.nanoTime();
        bubblesort(A);
        time2 = System.nanoTime();
        checkorder(A);
        totaltime += (time2-time1);
    }
    System.out.println("Total time is: " + totaltime + ", numruns is: " + numruns);
    avgtime = (((double)totaltime)/numruns) / 1000000.0;
    System.out.println("Standard Bubble Sort: Size " + A.length + ", Time: " + avgtime);

    totaltime = 0;
    for (runs=0; runs<numruns; runs++) {
        for(i=0; i<B.length; i++) {
            A[i] = B[i];
        }
        time1 = System.nanoTime();
        bubblesortcheck(A);
        time2 = System.nanoTime();
        checkorder(A);
        totaltime += (time2-time1);
    }
    System.out.println("Total time is: " + totaltime + ", numruns is: " + numruns);
    avgtime = (((double)totaltime)/numruns) / 1000000.0;
    System.out.println("Swap Check Bubble Sort: Size " + A.length + ", Time: " + avgtime);

    totaltime = 0;
    for (runs=0; runs<numruns; runs++) {
        for (i=0; i<B.length; i++) {
            A[i] = B[i];
        }
        time1 = System.nanoTime();
        bubblecheckswap(A);
        time2 = System.nanoTime();
        checkorder(A);
        totaltime += (time2-time1);
    }
    System.out.println("Total time is: " + totaltime + ", numruns is: " + numruns);
    avgtime = (((double)totaltime)/numruns) / 1000000.0;
    System.out.println("Wikipedia Bubble Sort: Size " + A.length + ", Time: " + avgtime);
}

// A flag check if a pass did not have any swaps, which lets us quit
void bubblesortcheck(int[] A) {
    for (int i=0; i<A.length-1; i++) {// Insert i'th record
        boolean swaps = false;
        for (int j=1; j<A.length-i; j++)
            if (A[j-1] > A[j]) {
                swap(A, j-1, j);
                swaps = true;
            }
        if(!swaps) {  // Can quit early
            // System.out.println("Quit at " + i);
            break;
        }
    }
}

// Modify the flag to check position of last swap taken
void bubblesortcheck2(int[] A) {
    for (int i=0; i<A.length-1; i++) {// Insert i'th record
        int lastseen = 0;
        int top = A.length;
        for (int j=1; j<top; j++)
            if (A[j-1] > A[j]) {
                swap(A, j-1, j);
                lastseen = j-1;
            }
        top = lastseen;
        if (top == 0) {  // Can quit early
            // System.out.println("Quit at " + i);
            break;
        }
    }
}

// Wikipedia article "optimization" to only swap up to the last swap seen
/* *** ODSATag: BubblesortCheck *** */
void bubblecheckswap(int[] A) {
    int n = A.length;
    while (n > 0) {
        int newn = 0;
        for (int i = 1; i < n; i++) {
            /* if this pair is out of order */
            if (A[i - 1] > A[i]) {
                swap(A, i - 1, i);
                newn = i;
            }
        }
        n = newn;
    }
}
/* *** ODSAendTag: BubblesortCheck *** */

// Wikipedia article "optimization" to only swap up to the last swap seen
void unwikipedia(int[] A) {
    int n = A.length-1;
    while (n>0) {
        for (int i=0; i<n; i++)
            /* if this pair is out of order */
            if (A[i] > A[i+1]) {
                swap(A, i, i+1);
            }
        n -= 1;
    }
}

// Wikipedia article "optimization" rewritten with a for loop
void wikipedia2(int[] A) {
    int newn;
    int loopcnt = 0;
    for(int n=A.length-1; n>0; n=newn) {
        loopcnt++;
        newn = 0;
        for (int i=0; i<n; i++)
            /* if this pair is out of order */
            if (A[i] > A[i+1]) {
                swap(A, i, i+1);
                newn = i;
            }
    }
    // System.out.println("Loopcnt was " + loopcnt);
}


Boolean sorttest(int[] B) {
    int i;
    for (i=0; i<B.length; i++) {
        A[i] = B[i];
    }
    bubblesort(A);
    if (!checkorder(A)) {
        return false;
    }
    return true;
}

/* *** ODSATag: Bubblesort *** */
void bubblesort(int[] A) {
  for (int i=0; i<A.length-1; i++) // Insert i'th record
    for (int j=1; j<A.length-i; j++)
      if (A[j-1] > A[j])
        swap(A, j-1, j);
}
/* *** ODSAendTag: Bubblesort *** */

void bubblesortinstrument(int[] A) {
    for (int i=0; i<A.length-1; i++) // Insert i'th record
        for (int j=1; j<A.length-i; j++) {
            if (A[j-1] > A[j]) {
                swap(A, j-1, j);
                swaps++;
            }
            compares++;
        }
}

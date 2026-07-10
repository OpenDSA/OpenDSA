void sorttime(T[] B) {
    int i;
    long totaltime;
    int runs;
    double avgtime;


    swaps = 0;
    compares = 0;
    totaltime = 0;
    if (!prod) {
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

    System.out.println("Doing timings for an array of size " + B.length + " on the basis of " + numruns + " runs");
    avgtime = (((double)totaltime)/numruns) / 1000000.0;
    System.out.println("Instrumented Standard Bubble Sort: Size " + A.length + ", Time: " + avgtime);
    System.out.println("Compares: " + compares/numruns + ", swaps: " + swaps/numruns);
    }

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
    if (!prod)
        System.out.println("Total time is: " + totaltime + ", numruns is: " + numruns);
    avgtime = (((double)totaltime)/numruns) / 1000000.0;
    System.out.println("Standard Bubble Sort: Size " + A.length + ", Time: " + avgtime);

    totaltime = 0;
    if (!prod) {
    for (runs=0; runs<numruns; runs++) {
        for (i=0; i<B.length; i++) {
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
    }
    
    totaltime = 0;
    if (!prod) {
    for (runs=0; runs<numruns; runs++) {
        for (i=0; i<B.length; i++) {
            A[i] = B[i];
        }
        time1 = System.nanoTime();
        bubblesortcheck2(A);
        time2 = System.nanoTime();
        checkorder(A);
        totaltime += (time2-time1);
    }
    System.out.println("Total time is: " + totaltime + ", numruns is: " + numruns);
    avgtime = (((double)totaltime)/numruns) / 1000000.0;
    System.out.println("Swap Check Bubble Sort 2: Size " + A.length + ", Time: " + avgtime);
    }

    totaltime = 0;
    if (!prod) {
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
    
    totaltime = 0;
    if (!prod) {
    for (runs=0; runs<numruns; runs++) {
        for (i=0; i<B.length; i++) {
            A[i] = B[i];
        }
        time1 = System.nanoTime();
        wikipedia2(A);
        time2 = System.nanoTime();
        checkorder(A);
        totaltime += (time2-time1);
    }
    System.out.println("Total time is: " + totaltime + ", numruns is: " + numruns);
    avgtime = (((double)totaltime)/numruns) / 1000000.0;
    System.out.println("Wikipedia Bubble Sort 2: Size " + A.length + ", Time: " + avgtime);
    }
    
    totaltime = 0;
    for (runs=0; runs<numruns; runs++) {
        for (i=0; i<B.length; i++) {
            A[i] = B[i];
        }
        time1 = System.nanoTime();
        unwikipedia(A);
        time2 = System.nanoTime();
        checkorder(A);
        totaltime += (time2-time1);
    }
    if (!prod)
        System.out.println("Total time is: " + totaltime + ", numruns is: " + numruns);
    avgtime = (((double)totaltime)/numruns) / 1000000.0;
    System.out.println("Wikipedia Bubble Sort w/out checks: Size " + A.length + ", Time: " + avgtime);
}

// A flag check if a pass did not have any swaps, which lets us quit
void bubblesortcheck(T[] A) {
    for (int i=0; i<A.length-1; i++) {// Insert i'th record
        boolean swaps = false;
        for (int j=1; j<A.length-i; j++)
            if (A[j-1].compareTo(A[j]) > 0) {
                swap(A, j-1, j);
                swaps = true;
            }
        if(!swaps) { // Can quit early
            // System.out.println("Quit at " + i);
            break;
        }
    }
}

// Modify the flag to check position of last swap taken
void bubblesortcheck2(T[] A) {
    for (int i=0; i<A.length-1; i++) {// Insert i'th record
        int lastseen = 0;
        int top = A.length;
        for (int j=1; j<top; j++)
            if (A[j-1].compareTo(A[j]) > 0) {
                swap(A, j-1, j);
                lastseen = j-1;
            }
        top = lastseen;
        if (top == 0) { // Can quit early
            // System.out.println("Quit at " + i);
            break;
        }
    }
}

// Wikipedia article "optimization" to only swap up to the last swap seen
/* *** ODSATag: BubblesortCheck *** */
void bubblecheckswap(T[] A) {
  int n = A.length - 1;
  while (n > 0) {
    int newn = 0;
    for (int i = 0; i < n; i++) {
      /* if this pair is out of order */
      if (A[i].compareTo(A[i+1]) > 0) {
        swap(A, i, i+1);
        newn = i;
      }
    }
    n = newn;
  }
}
/* *** ODSAendTag: BubblesortCheck *** */

// Wikipedia article "optimization" to only swap up to the last swap seen
void unwikipedia(T[] A) {
    int n = A.length-1;
    while (n>0) {
        for (int i=0; i<n; i++) {
            /* if this pair is out of order */
            if (A[i].compareTo(A[i+1]) > 0) {
                swap(A, i, i+1);
            }
        }
        n -= 1;
    }
}

// Wikipedia article "optimization" rewritten with a for loop
void wikipedia2(T[] A) {
    int newn;
    int loopcnt = 0;
    for(int n=A.length-1; n>0; n=newn) {
        loopcnt++;
        newn = 0;
        for (int i=0; i<n; i++)
            /* if this pair is out of order */
            if (A[i].compareTo(A[i+1]) > 0) {
                swap(A, i, i+1);
                newn = i;
            }
    }
    // System.out.println("Loopcnt was " + loopcnt);
}


Boolean sorttest(T[] B) {
    int i;
    System.out.println("Test Bubble Sort");
    for (i=0; i<B.length; i++) {
        A[i] = B[i];
    }
    bubblesort(A);
    if (!checkorder(A)) { return false; }
    return true;
}

/* *** ODSATag: Bubblesort *** */
void bubblesort(T[] A) {
  for (int i=0; i<A.length-1; i++) // Insert i'th record
    for (int j=1; j<A.length-i; j++)
      if (A[j-1].compareTo(A[j]) > 0)
        swap(A, j-1, j);
}
/* *** ODSAendTag: Bubblesort *** */

void bubblesortinstrument(T[] A) {
  for (int i=0; i<A.length-1; i++) { // Insert i'th record
    for (int j=1; j<A.length-i; j++) {
      compares++;
      if (A[j-1].compareTo(A[j]) > 0) {
        swaps++;
        swap(A, j-1, j);
      }
    }
  }
}

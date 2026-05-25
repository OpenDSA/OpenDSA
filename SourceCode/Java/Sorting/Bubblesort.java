static void sorttime(int[] B) {
    int i;
    Integer[] A =  new Integer[B.length];
    int[] Aint = new int[B.length];
    int totaltime, runs;
    double avgtime;

    println("Doing timings on the basis of " + numtests + " runs");
    println("B.length is " + B.length);

    swaps = 0;
    compares = 0;
    totaltime = 0;
    for (runs=0; runs<numtests; runs++) {
        for (i=0; i<B.length; i++)
            Aint[i] = B[i];
        println("A[0] is " + Aint[0] + ", A[9] is " + Aint[9]);
        time1 = System.nanoTime();
        bubblesortinstrument(Aint);
        time2 = System.nanoTime();
        checkorder(Aint);
        totaltime += (time2-time1);
    }
    println("Total time is: " + totaltime + ", numtests is: " + numtests);
    avgtime = ((double)totaltime)/numtests;
    println("Instrumented Standard Bubble Sort: Size " + testsize + ", Time: " + avgtime);
    println("Compares: " + compares/numtests + ", swaps: " + swaps/numtests);

    totaltime = 0;
    for (runs=0; runs<numtests; runs++) {
        for (i=0; i<B.length; i++)
            Aint[i] = B[i];
        println("A[0] is " + Aint[0] + ", A[9] is " + Aint[9]);
        time1 = System.nanoTime();
        bubblesort(Aint);
        time2 = System.nanoTime();
        checkorder(Aint);
        totaltime += (time2-time1);
    }
    println("Total time is: " + totaltime + ", numtests is: " + numtests);
    avgtime = ((double)totaltime)/numtests;
    println("Standard Bubble Sort: Size " + testsize + ", Time: " + avgtime);

    totaltime = 0;
    for (runs=0; runs<numtests; runs++) {
        for(i=0; i<B.length; i++)
            Aint[i] = B[i];
        println("A[0] is " + Aint[0] + ", A[9] is " + Aint[9]);
        time1 = System.nanoTime();
        bubblesortcheck(Aint);
        time2 = System.nanoTime();
        checkorder(Aint);
        totaltime += (time2-time1);
    }
    avgtime = ((double)totaltime)/numtests;
    println("Swap Check Bubble Sort: Size " + testsize + ", Time: " + avgtime);
  
    totaltime = 0;
    for (runs=0; runs<numtests; runs++) {
        for(i=0; i<B.length; i++)
            A[i] = B[i];
        println("A[0] is " + A[0] + ", A[9] is " + A[9]);
        time1 = System.nanoTime();
        //        bubblesortcheck2(A);
        time2 = System.nanoTime();
        //        checkorder(A);
        totaltime += (time2-time1);
    }
    avgtime = ((double)totaltime)/numtests;
    println("Totaltime: " + totaltime + ", numtests: " + numtests);
    println("INTEGER Swap Check Bubble Sort 2: Size " + testsize + ", Time: " + avgtime);

    totaltime = 0;
    for (runs=0; runs<numtests; runs++) {
        for (i=0; i<B.length; i++)
            Aint[i] = Integer.valueOf(B[i]);
        println("A[0] is " + Aint[0] + ", A[9] is " + Aint[9]);
        time1 = System.nanoTime();
        bubblecheckswap(Aint);
        time2 = System.nanoTime();
        checkorder(Aint);
        totaltime += (time2-time1);
    }
    avgtime = ((double)totaltime)/numtests;
    println("Wikipedia Bubble Sort: Size " + testsize + ", " + numtests + " Time: " + avgtime);

    totaltime = 0;
    for (runs=0; runs<numtests; runs++) {
        for(i=0; i<B.length; i++)
            A[i] = B[i];
        println("A[0] is " + A[0] + ", A[9] is " + A[9]);
        time1 = System.nanoTime();
        //        wikipedia2(A);
        time2 = System.nanoTime();
        //        checkorder(A);
        totaltime += (time2-time1);
    }
    avgtime = ((double)totaltime)/numtests;
    println("INTEGER Wikipedia Bubble Sort 2: Size " + testsize + ", Time: " + avgtime);

    totaltime = 0;
    for (runs=0; runs<numtests; runs++) {
        for(i=0; i<B.length; i++)
            A[i] = B[i];
        println("A[0] is " + A[0] + ", A[9] is " + A[9]);
        time1 = System.nanoTime();
        //        unwikipedia(A);
        time2 = System.nanoTime();
        //        checkorder(A);
        totaltime += (time2-time1);
    }
    avgtime = ((double)totaltime)/numtests;
    println("INTEGER Wikipedia Bubble Sort w/out checks: Size " + testsize + ", " + numtests + " Time: " + avgtime);
}

// A flag check if a pass did not have any swaps, which lets us quit
static void bubblesortcheck(int[] A) {
    for (int i=0; i<A.length-1; i++) {// Insert i'th record
        boolean swaps = false;
        for (int j=1; j<A.length-i; j++)
            if (A[j-1] > A[j]) {
                swap(A, j-1, j);
                swaps = true;
            }
        if(!swaps) { println("Quit at " + i); break; }  // Can quit early
    }
}

// Modify the flag to check position of last swap taken
static void bubblesortcheck2(int[] A) {
    for (int i=0; i<A.length-1; i++) {// Insert i'th record
        int lastseen = 0;
        int top = A.length;
        for (int j=1; j<top; j++)
            if (A[j-1] > A[j]) {
                swap(A, j-1, j);
                lastseen = j-1;
            }
        top = lastseen;
        if (top == 0) { println("Quit at " + i); break; }  // Can quit early
    }
}

// Wikipedia article "optimization" to only swap up to the last swap seen
/* *** ODSATag: BubblesortCheck *** */
static void bubblecheckswap(int[] A) {
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
static void unwikipedia(int[] A) {
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
static void wikipedia2(int[] A) {
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
    println("Loopcnt was " + loopcnt);
}


@SuppressWarnings("unchecked") // Generic array allocation
static Boolean sorttest(int[] B) {
    int i;
    Integer[] A = new Integer[B.length];
    int[] Aint = new int[B.length];
    for (i=0; i<B.length; i++) {
        A[i] = Integer.valueOf(B[i]);
        Aint[i] = B[i];
    }
    bubblesort(Aint);
    if (!checkorder(Aint)) {
        return false;
    }

    //  KVPair[] AKV = (KVPair[])new Object[B.length];
    //  for (i=0; i<B.length; i++)
    //    AKV[i] = new KVPair(new Integer(B[i]), new Integer(B[i]));
    //  inssort(A);
    //  if (!checkorder(A)) return false;
    return true;
}

/* *** ODSATag: Bubblesort *** */
static void bubblesort(int[] A) {
    for (int i=0; i<A.length-1; i++) // Insert i'th record
        for (int j=1; j<A.length-i; j++)
            if (A[j-1] > A[j])
                swap(A, j-1, j);
}
/* *** ODSAendTag: Bubblesort *** */

static void bubblesortinstrument(int[] A) {
    for (int i=0; i<A.length-1; i++) // Insert i'th record
        for (int j=1; j<A.length-i; j++) {
            if (A[j-1] > A[j]) {
                swap(A, j-1, j);
                swaps++;
            }
            compares++;
        }
}

static <T extends Comparable<T>> void bubblesortgen(T[] A) {
    for (int i=0; i<A.length-1; i++) // Insert i'th record
        for (int j=1; j<A.length-i; j++)
            if (A[j-1].compareTo(A[j]) > 0)
                swap(A, j-1, j);
}

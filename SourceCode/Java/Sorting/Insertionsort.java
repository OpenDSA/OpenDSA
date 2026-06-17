static void sorttime(int[] B) {
    int i;
    int[] Aint = new int[B.length];
    int totaltime, runs;
    double avgtime;

    System.out.println("Doing timings on the basis of " + numtests + " runs");
    System.out.println("B.length is " + B.length);

    swaps = 0;
    compares = 0;
    totaltime = 0;
    for (runs=0; runs<numtests; runs++) {
        for (i=0; i<B.length; i++) {
            Aint[i] = B[i];
        }
        System.out.println("A[0] is " + Aint[0] + ", A[9] is " + Aint[9]);
        time1 = System.nanoTime();
        inssortinstrument(Aint);
        time2 = System.nanoTime();
        checkorder(Aint);
        totaltime += (time2-time1);
    }
    System.out.println("Total time is: " + totaltime + ", numtests is: " + numtests);
    avgtime = (((double)totaltime)/numtests) / 1000000.0;
    System.out.println("Instrumented Standard Insertion Sort: Size " + testsize + ", Time: " + avgtime);
    System.out.println("Compares: " + compares/numtests + ", swaps: " + swaps/numtests);
    
    totaltime = 0;
    for (runs=0; runs<numtests; runs++) {
        for (i=0; i<B.length; i++) {
            Aint[i] = B[i];
        }
        System.out.println("A[0] is " + Aint[0] + ", A[9] is " + Aint[9]);
        time1 = System.nanoTime();
        inssort(Aint);
        time2 = System.nanoTime();
        checkorder(Aint);
        totaltime += (time2-time1);
    }
    System.out.println("Total time is: " + totaltime + ", numtests is: " + numtests);
    avgtime = (((double)totaltime)/numtests) / 1000000.0;
    System.out.println("Standard Insertion Sort: Size " + testsize + ", Time: " + avgtime);

    totaltime = 0;
    for (runs=0; runs<numtests; runs++) {
        for (i=0; i<B.length; i++)
            Aint[i] = B[i];
        System.out.println("A[0] is " + Aint[0] + ", A[9] is " + Aint[9]);
        time1 = System.nanoTime();
        inssort2(Aint);
        time2 = System.nanoTime();
        checkorder(Aint);
        totaltime += (time2-time1);
    }
    System.out.println("Total time is: " + totaltime + ", numtests is: " + numtests);
    avgtime = (((double)totaltime)/numtests) / 1000000.0;
    System.out.println("Standard Insertion Sort/Inline swaps: Size " + testsize + ", Time: " + avgtime);

    totaltime = 0;
    for (runs=0; runs<numtests; runs++) {
        for(i=0; i<B.length; i++)
            Aint[i] = B[i];
        System.out.println("A[0] is " + Aint[0] + ", A[9] is " + Aint[9]);
        time1 = System.nanoTime();
        inssortshift(Aint);
        time2 = System.nanoTime();
        checkorder(Aint);
        totaltime += (time2-time1);
    }
    System.out.println("Total time is: " + totaltime + ", numtests is: " + numtests);
    avgtime = (((double)totaltime)/numtests) / 1000000.0;
    System.out.println("shuffling Insertion Sort: Size " + testsize + ", Time: " + avgtime);

    totaltime = 0;
    for (runs=0; runs<numtests; runs++) {
        for(i=0; i<B.length; i++)
            Aint[i] = B[i];
        System.out.println("A[0] is " + Aint[0] + ", A[9] is " + Aint[9]);
        time1 = System.nanoTime();
        inssortshift2(Aint);
        time2 = System.nanoTime();
        checkorder(Aint);
        totaltime += (time2-time1);
    }
    System.out.println("Total time is: " + totaltime + ", numtests is: " + numtests);
    avgtime = (((double)totaltime)/numtests) / 1000000.0;
    System.out.println("shuffling Insertion Sort 2: Size " + testsize + ", Time: " + avgtime);
}


// Same as inssortsuffle, but try != instead of < for the zero test
// This will only matter (maybe!) to JavaScript
static void inssortshift2(int[] A) {
    for (int i=1; i!=A.length; i++) { // Insert i'th record
        int j;
        int temp = A[i];
        for (j=i; (j!=0) && (temp < A[j-1]); j--)
            A[j] = A[j-1];
        A[j] = temp;
    }
}

/* *** ODSATag: InsertionOpt *** */
// Instead of swapping, "shift" the values down the array
static void inssortshift(int[] A) {
    for (int i=1; i<A.length; i++) { // Insert i'th record
        int j;
        int temp = A[i];
        for (j=i; (j>0) && (temp < A[j-1]); j--)
            A[j] = A[j-1];
        A[j] = temp;
    }
}
/* *** ODSAendTag: InsertionOpt *** */

// Same as standard insertion sort, except inline the swap operation
static void inssort2(int[] A) {
    int temp;
    for (int i=1; i<A.length; i++) { // Insert i'th record
        for (int j=i; (j>0) && (A[j] < A[j-1]); j--) {
            temp = A[j]; A[j] = A[j-1]; A[j-1] = temp;
        }
    }
}

static Boolean sorttest(int[] B) {
    int i;
    int[] Aint = new int[B.length];
    for (i=0; i<B.length; i++)
        Aint[i] = B[i];
    inssort(Aint);
    if (!checkorder(Aint)) return false;
    return true;
}


/* *** ODSATag: Insertionsort *** */
static void inssort(int[] A) {
    for (int i=1; i<A.length; i++) // Insert i'th record
        for (int j=i; (j>0) && (A[j] < A[j-1]); j--)
            swap(A, j, j-1);
}
/* *** ODSAendTag: Insertionsort *** */

static void inssortinstrument(int[] A) {
    int j;
    for (int i=1; i<A.length; i++) { // Insert i'th record
        for (j=i; (j>0) && (A[j] < A[j-1]); j--) {
            swaps++;
            compares++;
            swap(A, j, j-1);
        }
        if (j != 0) compares++;
    }
}


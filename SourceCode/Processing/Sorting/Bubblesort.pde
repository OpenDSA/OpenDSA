void sorttime(Integer[] B) {
  int i;
  Integer[] A = new Integer[B.length];
  int totaltime, runs;
  int numruns = 20;

  totaltime = 0;
  for (runs=0; runs<numruns; runs++) {
    for(i=0; i<B.length; i++) A[i] = B[i];
    time1 = millis();
    bubblesort(A);
    time2 = millis();
    checkorder(A);
    totaltime += (time2-time1);
  }
  println("Standard Bubble Sort on Comparable objects for " +
          numruns + " runs: Size " + testsize + ", Time: " + totaltime);

  totaltime = 0;
  int[] Aint = new int[B.length];
  for (runs=0; runs<numruns; runs++) {
    for(i=0; i<B.length; i++) Aint[i] = (int)((Integer)B[i]);
    time1 = millis();
    bubblesortint(Aint);
    time2 = millis();
    checkorder(A);
    totaltime += (time2-time1);
  }
  println("Standard Bubble Sort on int array for " +
          numruns + " runs: Size " + testsize + ", Time: " + totaltime);

  totaltime = 0;
  KVPair[] AKV = new KVPair[B.length];
  for (runs=0; runs<numruns; runs++) {
    for(i=0; i<B.length; i++) AKV[i] = new KVPair(B[i], (Integer)B[i]);
    time1 = millis();
    bubblesort(AKV);
    time2 = millis();
    checkorder(AKV);
    totaltime += (time2-time1);
  }
  println("Standard Bubble Sort on KVPair for " +
          numruns + " runs: Size " + testsize + ", Time: " + totaltime);

  totaltime = 0;
  for (runs=0; runs<numruns; runs++) {
    for(i=0; i<B.length; i++) A[i] = B[i];
    time1 = millis();
    bubblesort2(A);
    time2 = millis();
    checkorder(A);
    totaltime += (time2-time1);
  }
  println("Standard Bubble Sort on Comparable objects" +
          " with inlined swap for " + numruns +
          " runs: Size " + testsize + ", Time: " + totaltime);

  for(i=0; i<B.length; i++) A[i] = B[i];
  time1 = millis();
  bubblesortcheck(A);
  time2 = millis();
  checkorder(A);
  println("Swap Check Bubble Sort on Comparable objects (ONE run):\n" +
          "Done to check on stopping point. Size " +
          testsize + ", Time: " + (time2-time1)); 

  for(i=0; i<B.length; i++) A[i] = B[i];
  time1 = millis();
  bubblesortcheck2(A);
  time2 = millis();
  checkorder(A);
  println("Swap Check Bubble Sort 2 on Comparable objects (ONE run):\n" +
          "Done to check on stopping point. Size " +
          testsize + ", Time: " + (time2-time1)); 

  totaltime = 0;
  for (runs=0; runs<numruns; runs++) {
    for(i=0; i<B.length; i++) A[i] = B[i];
    time1 = millis();
    bubblecheckswap(A);
    time2 = millis();
    checkorder(A);
    totaltime += (time2-time1);
  }
  println("Wikipedia Bubble Sort on Comparable objects, while loop.\n" +
          "Size " + testsize + ", for " + numruns + " runs, Time: " +
          totaltime);

  totaltime = 0;
  for (runs=0; runs<numruns; runs++) {
    for(i=0; i<B.length; i++) Aint[i] = (int)((Integer)B[i]);
    time1 = millis();
    bubblecheckswapint(Aint);
    time2 = millis();
    checkorder(A);
    totaltime += (time2-time1);
  }
  println("Wikipedia Bubble Sort on int array, while loop.\n" +
          "Size " + testsize + ", for " + numruns + " runs, Time: " +
          totaltime);

  totaltime = 0;
  AKV = new KVPair[B.length];
  for (runs=0; runs<numruns; runs++) {
    for(i=0; i<B.length; i++) AKV[i] = new KVPair(B[i], (Integer)B[i]);
    time1 = millis();
    bubblecheckswap(AKV);
    time2 = millis();
    checkorder(A);
    totaltime += (time2-time1);
  }
  println("Wikipedia Bubble Sort on KVPair, while loop.\n" +
          "Size " + testsize + ", for " + numruns + " runs, Time: " +
          totaltime);

  for(i=0; i<B.length; i++) A[i] = B[i];
  time1 = millis();
  wikipedia2(A);
  time2 = millis();
  checkorder(A);
  println("Wikipedia Bubble Sort on Comparable objects, for loop.\n" +
          "Size " + testsize + ", for " + numruns + " runs, Time: " +
          totaltime);

  totaltime = 0;
  for (runs=0; runs<numruns; runs++) {
    for(i=0; i<B.length; i++) A[i] = B[i];
    time1 = millis();
    unwikipedia(A);
    time2 = millis();
    checkorder(A);
    totaltime += (time2-time1);
  }
  println("UNWikipedia Bubble Sort: Same structure with no swap checking.\n" +
          "Size " + testsize + ", for " + numruns + " runs, Time: " +
          totaltime);
}


/* *** ODSATag: Bubblesort *** */
void bubblesort(Comparable[] A) {
  for (int i=0; i<A.length-1; i++) // Insert i'th record
    for (int j=1; j<A.length-i; j++)
      if (A[j-1].compareTo(A[j]) > 0)
        swap(A, j-1, j);
}
/* *** ODSAendTag: Bubblesort *** */


void bubblesortint(int[] A) {
  for (int i=0; i<A.length-1; i++) // Insert i'th record
    for (int j=1; j<A.length-i; j++)
      if (A[j-1] > A[j])
        swap(A, j-1, j);
}

// Use an inline swap
void bubblesort2(Comparable[] A) {
  Comparable temp;
  int j = 0;
  for (int i=0; i<A.length-1; i++) // Insert i'th record
    for (j=1; j<A.length-i; j++) {
      if (A[j-1].compareTo(A[j]) > 0) {
        temp = A[j]; A[j] = A[j-1]; A[j-1] = temp;
      }
    }
}


// A flag checks if a pass did not have any swaps, which lets us quit
// The purpose of this version is to see when it quits
void bubblesortcheck(Comparable[] A) {
  for (int i=0; i<A.length-1; i++) {// Insert i'th record
    boolean swaps = false;
    for (int j=1; j<A.length-i; j++)
      if (A[j-1].compareTo(A[j]) > 0) {
        swap(A, j-1, j);
        swaps = true;
      }
    if(!swaps) { println("Quit at " + i); break; }  // Can quit early
  }
}

// Modify the flag to check position of last swap taken
// The purpose of this version is to see when it quits
void bubblesortcheck2(Comparable[] A) {
  for (int i=0; i<A.length-1; i++) {// Insert i'th record
    int lastseen = 0;
    int top = A.length;
    for (int j=1; j<top; j++)
      if (A[j-1].compareTo(A[j]) > 0) {
        swap(A, j-1, j);
        lastseen = j-1;
      }
    top = lastseen;
    if (top == 0) { println("Quit at " + i); break; }  // Can quit early
  }
}


// Wikipedia article "optimization" to only swap up to the last swap seen
/* *** ODSATag: BubblesortCheck *** */
void bubblecheckswap(Comparable[] A) {
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
// int array version
void bubblecheckswapint(int[] A) {
  int n = A.length - 1;
  while (n > 0) {
    int newn = 0;
    for (int i = 0; i < n; i++) {
      /* if this pair is out of order */
      if (A[i] > A[i+1]) {
        swap(A, i, i+1);
        newn = i;
      }
    }
    n = newn;
  }
}


// Wikipedia article "optimization" rewritten with a for loop
void wikipedia2(Comparable[] A) {
  int newn;
  for(int n=A.length-1; n>0; n=newn) {
    newn = 0;
    for (int i=0; i<n; i++)
      /* if this pair is out of order */
      if (A[i].compareTo(A[i+1]) > 0) {
        swap(A, i, i+1);
        newn = i;
      }
  }
}


// Wikipedia article-compatible version without swap checking
void unwikipedia(Comparable[] A) {
  int n = A.length-1;
  while (n>0) {
    for (int i=0; i<n; i++)
      /* if this pair is out of order */
      if (A[i].compareTo(A[i+1]) > 0) {
        swap(A, i, i+1);
      }
    n -= 1;
  }
}


void sorttest(Comparable[] A) {
  bubblesort(A);
}

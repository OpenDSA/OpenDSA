static void sorttime(int[] B) {
  int i;
  int[] A = new int[B.length];
  Integer[] Aint =  new Integer[B.length];
  int totaltime, runs;
  int numruns = 5;

  println("Doing timings on the basis of " + numruns + " runs");

totaltime = 0;
for (runs=0; runs<numruns; runs++) {
  for (i=0; i<B.length; i++)
    Aint[i] = new Integer(B[i]);
  time1 = millis();
  bubblesort(Aint);
  time2 = millis();
  checkorder(Aint);
totaltime += (time2-time1);
}
  println("Standard Bubble Sort: Size " + testsize + ", Time: " + (time2-time1));

  for(i=0; i<B.length; i++) A[i] = B[i];
  time1 = millis();
  bubblesortcheck(A);
  time2 = millis();
  checkorder(A);
  println("Swap Check Bubble Sort: Size " + testsize + ", Time: " + (time2-time1));

  for(i=0; i<B.length; i++) A[i] = B[i];
  time1 = millis();
  bubblesortcheck2(A);
  time2 = millis();
  checkorder(A);
  println("Swap Check Bubble Sort 2: Size " + testsize + ", Time: " + (time2-time1));

totaltime = 0;
for (runs=0; runs<numruns; runs++) {
  for (i=0; i<B.length; i++)
    Aint[i] = new Integer(B[i]);
  time1 = millis();
  bubblecheckswap(Aint);
  time2 = millis();
  checkorder(Aint);
totaltime += (time2-time1);
}
  println("Wikipedia Bubble Sort: Size " + testsize + ", " + numruns + " Time: " + totaltime);

  for(i=0; i<B.length; i++) A[i] = B[i];
  time1 = millis();
  wikipedia2(A);
  time2 = millis();
  checkorder(A);
  println("Wikipedia Bubble Sort 2: Size " + testsize + ", Time: " + (time2-time1));

totaltime = 0;
for (runs=0; runs<numruns; runs++) {
  for(i=0; i<B.length; i++) A[i] = B[i];
  time1 = millis();
  unwikipedia(A);
  time2 = millis();
  checkorder(A);
totaltime += (time2-time1);
}
  println("Wikipedia Bubble Sort w/out checks: Size " + testsize + ", " + numruns + " Time: " + totaltime);
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
static <T extends Comparable<T>> void bubblecheckswap(T[] A) {
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
  for (i=0; i<B.length; i++)
    A[i] = new Integer(B[i]);
  bubblesort(A);
  if (!checkorder(A)) return false;

  //  KVPair[] AKV = (KVPair[])new Object[B.length];
  //  for (i=0; i<B.length; i++)
  //    AKV[i] = new KVPair(new Integer(B[i]), new Integer(B[i]));
  //  inssort(A);
  //  if (!checkorder(A)) return false;
  return true;
}

/* *** ODSATag: Bubblesort *** */
static <T extends Comparable<T>> void bubblesort(T[] A) {
  for (int i=0; i<A.length-1; i++) // Insert i'th record
    for (int j=1; j<A.length-i; j++)
      if (A[j-1].compareTo(A[j]) > 0)
        swap(A, j-1, j);
}
/* *** ODSAendTag: Bubblesort *** */

static void sorttime(int[] B) {
  int i;
  int[] A = new int[B.length];
  Integer[] Aint = new Integer[B.length];
  int totaltime, runs;
  int numruns = 20;

  println("Doing timings on the basis of " + numruns + " runs");

totaltime = 0;
for (runs=0; runs<numruns; runs++) {
  for (i=0; i<B.length; i++)
    Aint[i] = new Integer(B[i]);
  time1 = millis();
  selsort(Aint);
  time2 = millis();
  checkorder(Aint);
totaltime += (time2-time1);
}
  println("Standard Selection Sort: Size " + testsize + ", Time: " + totaltime);

totaltime = 0;
for (runs=0; runs<numruns; runs++) {
  for(i=0; i<B.length; i++) A[i] = B[i];
  time1 = millis();
  selsortcheck(A);
  time2 = millis();
  checkorder(A);
totaltime += (time2-time1);
}
  println("Standard Selection Sort: Size " + testsize + ", Time: " + totaltime);
}

// Same as selsort, but check if the swap is necessary
static void selsortcheck(int[] A) {
  for (int i=0; i<A.length-1; i++) { // Select i'th biggest record
    int bigindex = 0;                // Current biggest index
    for (int j=1; j<A.length-i; j++) // Find the max value
      if (A[j] > A[bigindex])        // Found something bigger  
        bigindex = j;                // Remember bigger index
    if (bigindex != A.length-i-1)
      swap(A, bigindex, A.length-i-1); // Put it into place
  }
}

@SuppressWarnings("unchecked") // Generic array allocation
static Boolean sorttest(int[] B) {
  int i;
  Integer[] A = new Integer[B.length];
  for (i=0; i<B.length; i++)
    A[i] = new Integer(B[i]);
  selsort(A);
  if (!checkorder(A)) return false;

  //  KVPair[] AKV = (KVPair[])new Object[B.length];
  //  for (i=0; i<B.length; i++)
  //    AKV[i] = new KVPair(new Integer(B[i]), new Integer(B[i]));
  //  inssort(A);
  //  if (!checkorder(A)) return false;
  return true;
}

/* *** ODSATag: Selectionsort *** */
static <T extends Comparable<T>> void selsort(T[] A) {
  for (int i=0; i<A.length-1; i++) {       // Select i'th biggest record
    int bigindex = 0;                      // Current biggest index
    for (int j=1; j<A.length-i; j++)       // Find the max value
      if (A[j].compareTo(A[bigindex]) > 0) // Found something bigger  
        bigindex = j;                      // Remember bigger index
    swap(A, bigindex, A.length-i-1);       // Put it into place
  }
}
/* *** ODSAendTag: Selectionsort *** */

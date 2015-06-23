static void sorttime(int[] B) {
  int i;
  Integer[] A = new Integer[B.length];
  int[] Aint = new int[B.length];
  int totaltime, runs;
  int numruns = 5;

  println("Doing timings on the basis of " + numruns + " runs");

totaltime = 0;
for (runs=0; runs<numruns; runs++) {
  for (i=0; i<B.length; i++)
    A[i] = new Integer(B[i]);
  time1 = millis();
  inssort(A);
  time2 = millis();
  checkorder(A);
totaltime += (time2-time1);
}
  println("Standard Insertion Sort: Size " + testsize + ", Time: " + totaltime);

totaltime = 0;
for (runs=0; runs<numruns; runs++) {
  for (i=0; i<B.length; i++)
    Aint[i] = B[i];
  time1 = millis();
  inssort2(Aint);
  time2 = millis();
  checkorder(Aint);
totaltime += (time2-time1);
}
  println("Standard Insertion Sort/No swaps: Size " + testsize + ", Time: " + totaltime);

totaltime = 0;
for (runs=0; runs<numruns; runs++) {
  for(i=0; i<B.length; i++) Aint[i] = B[i];
  time1 = millis();
  inssortshift(Aint);
  time2 = millis();
  checkorder(Aint);
totaltime += (time2-time1);
}
  println("shuffling Insertion Sort: Size " + testsize + ", Time: " + totaltime);

totaltime = 0;
for (runs=0; runs<numruns; runs++) {
  for(i=0; i<B.length; i++) Aint[i] = B[i];
  time1 = millis();
  inssortshift2(Aint);
  time2 = millis();
  checkorder(Aint);
totaltime += (time2-time1);
}
  println("shuffling Insertion Sort 2: Size " + testsize + ", Time: " + totaltime);
}


// Same as inssortsuffle, but try != instead of < for the zero test
// This will only matter to JavaScript
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

// Same as standard insertion sort, except get rid of the swap
// function call
static void inssort2(int[] A) {
  int temp;
  for (int i=1; i<A.length; i++) // Insert i'th record
    for (int j=i; (j>0) && (A[j] < A[j-1]); j--) {
      temp = A[j]; A[j] = A[j-1]; A[j-1] = temp;
    }
}

@SuppressWarnings("unchecked") // Generic array allocation
static Boolean sorttest(int[] B) {
  int i;
  Integer[] A = new Integer[B.length];
  for (i=0; i<B.length; i++)
    A[i] = new Integer(B[i]);
  inssort(A);
  if (!checkorder(A)) return false;

  //  KVPair[] AKV = (KVPair[])new Object[B.length];
  //  for (i=0; i<B.length; i++)
  //    AKV[i] = new KVPair(new Integer(B[i]), new Integer(B[i]));
  //  inssort(A);
  //  if (!checkorder(A)) return false;
  return true;
}

/* *** ODSATag: Insertionsort *** */
static <T extends Comparable<T>> void inssort(T[] A) {
  for (int i=1; i<A.length; i++) // Insert i'th record
    for (int j=i; (j>0) && (A[j].compareTo(A[j-1]) < 0); j--)
      swap(A, j, j-1);
}
/* *** ODSAendTag: Insertionsort *** */
